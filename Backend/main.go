package main

import (
	"fmt"
	"log"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// CHANGE 1: Change the map value from 'bool' to 'string' so we can store names
var clients = make(map[*websocket.Conn]string)
var broadcast = make(chan string)

// CHANGE 2: Add a global counter to track how many people joined
var clientID = 0
var mutex = &sync.Mutex{}

func handleConnections(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
	}
	defer ws.Close()

	// Assign a name to this new client
	mutex.Lock()
	clientID++ // Increment the counter
	// Create a name like "Client 1"
	myName := fmt.Sprintf("Client %d", clientID) 
	clients[ws] = myName
	mutex.Unlock()

	fmt.Printf("%s joined!\n", myName)

	for {
		_, msg, err := ws.ReadMessage()
		if err != nil {
			mutex.Lock()
			delete(clients, ws)
			mutex.Unlock()
			break
		}

		// CHANGE 3: Before broadcasting, prepend the user's name
		// We format it as "Client X: hello"
		formattedMessage := fmt.Sprintf("%s: %s", myName, string(msg))
		
		// Send the formatted message to the broadcast channel
		broadcast <- formattedMessage
	}
}

func handleMessages() {
	for {
		msg := <-broadcast

		mutex.Lock()
		for client := range clients {
			// Write the message (which now includes the name)
			err := client.WriteMessage(websocket.TextMessage, []byte(msg))
			if err != nil {
				log.Printf("Error sending to client: %v", err)
				client.Close()
				delete(clients, client)
			}
		}
		mutex.Unlock()
	}
}

func main() {
	http.HandleFunc("/ws", handleConnections)
	go handleMessages()

	fmt.Println("Chat Server started on :8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
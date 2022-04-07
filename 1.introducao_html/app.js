
 // Event Class: Represents an event
class Event {
    constructor(time, event, details) {
      this.time = time;
      this.event = event;
      this.details = details;
    }
  }

 // UI Class: Handles UI Tasks
  class UI {
    static displayEvents() {
      const events = Store.getEvents();

      events.forEach((event) => UI.addEventToList(event));
    }

    static addEventToList(event) {
      const list = document.querySelector('#event-list');

      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${event.time}</td>
        <td>${event.event}</td>
        <td>${event.details}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;

      list.appendChild(row);
    }


  // Method to delete an event
    static deleteEvent(el) {
      if(el.classList.contains('deletar')) {
        el.parentElement.parentElement.remove();
      }
    }



  // Method to add div and add error or success alerts
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#schedule-form');
      container.insertBefore(div, form);



      // Adding setTimeOut to remove alert div error from dom after 3 seconds
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }



  // Method to clear fields after added event
    static clearField() {
      document.querySelector('#time').value = '';
      document.querySelector('#event').value = '';
      document.querySelector('#details').value = '';
    }
  }



  // LocalStorage Class: Stringify data and format into array of objects with JSON.parse JSON.stringify
  class Store {
    static getEvents() {
      let events;
      if(localStorage.getItem('event') === null) {
        events = [];
      } else {
        events = JSON.parse(localStorage.getItem('event'));
      }

      return events;
    }

    static addEvent(event) {
      const events = Store.getEvents();
      events.push(event);
      localStorage.setItem('events', JSON.stringify(event));

    }

    static removeEvent(details) {
      const events = Store.getEvents();

      events.forEach((event, index) => {
        if(event.details === details) {
          events.splice(index, 1);
        }
      });

      localStorage.setItem('events', JSON.stringify(event));
    }
  }

 // Event: Display Events
  document.addEventListener('DOMContentLoaded', UI.displayEvents);

 // Event: Add an event
  document.querySelector('#schedule-form').addEventListener('submit', (e) => {

 //Prevent actual submit
    e.preventDefault();

 // Get form values by id
    const time = document.querySelector('#time').value;
    event = document.querySelector('#event').value;
    const details = document.querySelector('#details').value;

 // If statement to validate that start time and event input fields are populated
    if(time === '' || event === '' || details === '') {
      UI.showAlert('Please fill in all fields', 'danger');
    } else {
 // Instance of the event class to Instantiate event
      event = new Event(time, event, details);

 // Add Event to UI
      UI.addEventToList(event);

 // Add event to Store
      Store.addEvent(event);

 // Show success alert after input fields are populated
      UI.showAlert('Event Added', 'success');

 // Calling the clear fields method
      UI.clearFields();
    }
  });

 // Event: Remove an event
  document.querySelector('#event-list').addEventListener('click', (e) => {

 // Remove event from UI
    UI.deleteEvent(e.target);

 //Remove event from storage
    Store.removeEvent(e.target.parentElement.previousElementSibling.textContent);

    UI.showAlert('Event Removed', 'success');
  });
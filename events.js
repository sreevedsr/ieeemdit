const eventsSection = document.querySelector('#events-section');
const addEventSection = document.querySelector('#add-event-section');
const addEventForm = document.querySelector('form');
const eventNameInput = document.querySelector('#event-name');
const eventDateInput = document.querySelector('#event-date');
const eventDescriptionInput = document.querySelector('#event-description');
const addEventBtn = document.querySelector('#add-event-btn');

// hardcoded event data for demonstration purposes
let eventsData = [
   {
      id: 1,
      name: 'TechFest 2021',
      date: '2021-09-30',
      description: 'A tech exhibition showcasing various technologies and innovations.'
   },
   {
      id: 2,
      name: 'Coding Competition',
      date: '2021-10-15',
      description: 'A programming competition for tech enthusiasts.'
   },
   {
      id: 3,
      name: 'Webinar on Machine Learning',
      date: '2021-11-08',
      description: 'An informative webinar on machine learning and its applications.'
   }
];

// function to update the events list section
function updateEventsList() {
    eventsSection.innerHTML = '';
    let eventsListHTML = '<ul>';
    for(let i=0; i<eventsData.length; i++) {
        eventsListHTML += `<li>
                                <h3>${eventsData[i].name}</h3>
                                <p>Date: ${eventsData[i].date}</p>
                                <p>${eventsData[i].description}</p>
                                <button data-id="${eventsData[i].id}" class="edit-btn">Edit Event</button>
                            </li>`;
    }
    eventsListHTML += '</ul>';
    eventsSection.innerHTML = eventsListHTML;

    // add event listeners to the edit buttons
    const editBtns = document.querySelectorAll('.edit-btn');
    for (let i = 0; i < editBtns.length; i++) {
        editBtns[i].addEventListener('click', handleEditClick);
    }
}

// function to add a new event to the events list
function addEventToData() {
    const newEvent = {
        id: eventsData.length + 1,
        name: eventNameInput.value,
        date: eventDateInput.value,
        description: eventDescriptionInput.value
    };

    eventsData.push(newEvent);
}

// function to handle form submission for adding/editing an event
function handleFormSubmit(event) {
    event.preventDefault();
    const eventId = parseInt(addEventBtn.getAttribute('data-id'));

    if (eventId) {
        // editing an existing event
        editEventInData(eventId);
        addEventBtn.textContent = 'Add Event';
        addEventBtn.removeAttribute('data-id');
    } else {
        // adding a new event
        addEventToData();
    }
    updateEventsList();
    addEventForm.reset();
    addEventSection.scrollIntoView({ behavior: 'smooth' });
}

// function to handle click on the edit button
function handleEditClick(event) {
    const eventId = parseInt(event.target.getAttribute('data-id'));
    const eventToEdit = eventsData.find(event => event.id === eventId);
    if (eventToEdit) {
        eventNameInput.value = eventToEdit.name;
        eventDateInput.value = eventToEdit.date;
        eventDescriptionInput.value = eventToEdit.description;
        addEventBtn.textContent = 'Edit Event';
        addEventBtn.setAttribute('data-id', eventId);
        addEventSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// function to edit an existing event in the events list
function editEventInData(eventId) {
    const eventToEdit = eventsData.find(event => event.id === eventId);
    if (eventToEdit) {
        eventToEdit.name = eventNameInput.value;
        eventToEdit.date = eventDateInput.value;
        eventToEdit.description = eventDescriptionInput.value;
    }
}

// add event listener to the submit button
addEventBtn.addEventListener('click', handleFormSubmit);

// update events list on initial loading of the page
updateEventsList();
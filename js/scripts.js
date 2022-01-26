/// Business Logic for Address Book
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
};

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};


/// Business Logic for Contacts
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.address = {};
};


Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
};

Contact.prototype.submitAddress = function (address) {
  return this.address = address;
}

/// Business Logic for Address 
function Address(homeAddress, workAddress, email, workEmail) {
  this.homeAddress = homeAddress;
  this.workAddress = workAddress;
  this.email = email;
  this.workEmail = workEmail;
}


// User Interface Logic ---------
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function(key){
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".home-addy").html("Home Address: " + contact.address.homeAddress);
  $(".work-addy").html("Work Address: " + contact.address.workAddress);
  $(".email-addy").html("Email Address: " +contact.address.email);
  $(".work-email-addy").html("Work Email Address: " +contact.address.workEmail);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class ='deleteButton' id=" + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function () {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedHome = $("input#new-home-address").val();
    const inputtedWork = $("input#new-work-address").val();
    const inputtedEmail = $("input#email").val();
    const inputtedWorkEmail = $("input#new-work-email").val();


    // if (inputtedHome === "") {
    //   $("#1").remove();
    // } else if ( inputtedWork === "") {
    //   $("#2").remove()
    // } else if ( inputtedEmail === "") {
    //   $("#3").remove()
    // } else if ( inputtedWorkEmail === "") {
    //   $("#4").remove()
    // }
    
    // $("#show-contact").children("p").each(function() {
    //   let myVar = $(this);
    //   console.log(myVar);   
    // if ($("input[type='text']" === "")) {
      
    //   $("p").remove();
    //   }
    // })

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-home-address").val("");
    $("input#new-work-address").val("");
    $("input#email").val("");
    $("input#new-work-email").val("");

    const address = new Address(inputtedHome, inputtedWork, inputtedEmail, inputtedWorkEmail);
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
    addressBook.addContact(newContact);
    newContact.submitAddress(address);
    console.log(newContact);
    displayContactDetails(addressBook);
  });
});


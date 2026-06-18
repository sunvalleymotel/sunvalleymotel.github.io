// Mobile menu
document.getElementById('hamburger').addEventListener('click', function () {
  document.getElementById('mobile-menu').classList.toggle('open');
});

function closeMobileMenu() {
  document.getElementById('mobile-menu').classList.remove('open');
}

// Set today as minimum date
var today = new Date().toISOString().split('T')[0];
['checkin', 'checkout', 'm-checkin', 'm-checkout'].forEach(function (id) {
  var el = document.getElementById(id);
  if (el) el.min = today;
});

// Check availability
function checkAvailability() {
  var ci = document.getElementById('checkin').value;
  var co = document.getElementById('checkout').value;
  var room = document.getElementById('roomtype').value;
  var msg = document.getElementById('avail-msg');

  if (!ci || !co) {
    msg.className = 'avail-msg error';
    msg.style.display = 'block';
    msg.textContent = 'Please select both check-in and check-out dates.';
    return;
  }

  if (new Date(co) <= new Date(ci)) {
    msg.className = 'avail-msg error';
    msg.style.display = 'block';
    msg.textContent = 'Check-out date must be after your check-in date.';
    return;
  }

  var nights = Math.round((new Date(co) - new Date(ci)) / 86400000);
  msg.className = 'avail-msg success';
  msg.style.display = 'block';
  msg.innerHTML =
    '✓ Great news! <strong>' + room +
    '</strong> is available for ' +
    nights + ' night' + (nights > 1 ? 's' : '') +
    '. Scroll down to reserve your stay.';
}

// Modal open/close
var selectedRoomName = '';

function openModal(room, price) {
  selectedRoomName = room;
  document.getElementById('modal-room-badge').innerHTML = '🛏️ ' + room + ' &nbsp;·&nbsp; ' + price;

  var ci = document.getElementById('checkin').value;
  var co = document.getElementById('checkout').value;
  if (ci) document.getElementById('m-checkin').value = ci;
  if (co) document.getElementById('m-checkout').value = co;

  document.getElementById('modal-form-section').style.display = 'block';
  document.getElementById('modal-success-section').style.display = 'none';
  document.getElementById('booking-modal').classList.add('open');
  document.getElementById('m-name').focus();
}

function closeModal() {
  document.getElementById('booking-modal').classList.remove('open');
}

document.getElementById('booking-modal').addEventListener('click', function (e) {
  if (e.target === this) closeModal();
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModal();
    closeGalleryImage();
  }
});

// Submit booking
function submitBooking() {
  var name = document.getElementById('m-name').value.trim();
  var email = document.getElementById('m-email').value.trim();
  var ci = document.getElementById('m-checkin').value;
  var co = document.getElementById('m-checkout').value;

  if (!name) {
    alert('Please enter your full name.');
    document.getElementById('m-name').focus();
    return;
  }

  if (!email || !email.includes('@')) {
    alert('Please enter a valid email address.');
    document.getElementById('m-email').focus();
    return;
  }

  if (!ci || !co) {
    alert('Please select check-in and check-out dates.');
    return;
  }

  if (new Date(co) <= new Date(ci)) {
    alert('Check-out must be after check-in.');
    return;
  }

  document.getElementById('modal-form-section').style.display = 'none';
  document.getElementById('modal-success-section').style.display = 'block';
}

// Gallery lightbox
function openGalleryImage(src) {
  document.getElementById('galleryModalImg').src = src;
  document.getElementById('galleryModal').classList.add('open');
}

function closeGalleryImage() {
  document.getElementById('galleryModal').classList.remove('open');
  document.getElementById('galleryModalImg').src = '';
}
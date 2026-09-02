/* ==========================================
   COLLEGE TRANSPORT MANAGEMENT SYSTEM
   FRONTEND ONLY
========================================== */

/* ==========================================
   INITIAL DATA
========================================== */

function setupData() {
  if (!localStorage.getItem("users")) {
    const users = [
      {
        id: 1,
        name: "Admin",
        email: "admin@college.com",
        password: "admin123",
        role: "admin",
      },

      {
        id: 2,
        name: "Ravi Kumar",
        email: "driver@college.com",
        password: "driver123",
        role: "driver",
        bus: "BUS-101",
      },
    ];

    localStorage.setItem("users", JSON.stringify(users));
  }

  if (!localStorage.getItem("buses")) {
    const buses = [
      {
        id: 1,
        number: "BUS-101",
        registration: "TN01AB1234",
        capacity: 50,
      },

      {
        id: 2,
        number: "BUS-102",
        registration: "TN01CD5678",
        capacity: 45,
      },

      {
        id: 3,
        number: "BUS-103",
        registration: "TN01EF9012",
        capacity: 50,
      },
    ];

    localStorage.setItem("buses", JSON.stringify(buses));
  }

  if (!localStorage.getItem("routes")) {
    const routes = [
      {
        id: 1,
        name: "Chennai Central Route",
        bus: "BUS-101",
        start: "Chennai Central",
        end: "College",
        stops: ["Chennai Central", "Egmore", "Anna Nagar", "College"],
        time: "07:30",
      },

      {
        id: 2,
        name: "Tambaram Route",
        bus: "BUS-102",
        start: "Tambaram",
        end: "College",
        stops: ["Tambaram", "Chromepet", "Pallavaram", "College"],
        time: "07:15",
      },

      {
        id: 3,
        name: "Avadi Route",
        bus: "BUS-103",
        start: "Avadi",
        end: "College",
        stops: ["Avadi", "Ambattur", "Mogappair", "College"],
        time: "07:00",
      },
    ];

    localStorage.setItem("routes", JSON.stringify(routes));
  }

  if (!localStorage.getItem("complaints")) {
    localStorage.setItem("complaints", JSON.stringify([]));
  }

  if (!localStorage.getItem("tripStatus")) {
    localStorage.setItem("tripStatus", "Not Started");
  }
}

setupData();

/* ==========================================
   HELPER FUNCTIONS
========================================== */

function getData(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function currentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

/* ==========================================
   LOGIN PAGE
========================================== */

function showRegister() {
  document.getElementById("loginBox").classList.add("hidden");

  document.getElementById("registerBox").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("registerBox").classList.add("hidden");

  document.getElementById("loginBox").classList.remove("hidden");
}

/* LOGIN */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document
      .getElementById("loginEmail")
      .value.trim()
      .toLowerCase();

    const password = document.getElementById("loginPassword").value;

    const users = getData("users");

    const user = users.find(function (item) {
      return item.email === email && item.password === password;
    });

    if (!user) {
      alert("Invalid email or password");

      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    if (user.role === "admin") {
      location.href = "admin.html";
    } else if (user.role === "driver") {
      location.href = "driver.html";
    } else {
      location.href = "student.html";
    }
  });
}

/* REGISTER */

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("studentName").value.trim();

    const roll = document.getElementById("rollNumber").value.trim();

    const email = document
      .getElementById("registerEmail")
      .value.trim()
      .toLowerCase();

    const password = document.getElementById("registerPassword").value;

    const users = getData("users");

    const exists = users.some(function (user) {
      return user.email === email;
    });

    if (exists) {
      alert("Email already registered");

      return;
    }

    users.push({
      id: Date.now(),

      name: name,

      roll: roll,

      email: email,

      password: password,

      role: "student",
    });

    saveData("users", users);

    alert("Registration successful");

    registerForm.reset();

    showLogin();
  });
}

/* LOGOUT */

function logout() {
  localStorage.removeItem("currentUser");

  location.href = "index.html";
}

/* ==========================================
   STUDENT
========================================== */

if (location.pathname.endsWith("student.html")) {
  loadStudent();
}

function loadStudent() {
  const user = currentUser();

  if (!user || user.role !== "student") {
    location.href = "index.html";

    return;
  }

  document.getElementById("welcomeStudent").textContent =
    "Welcome, " + user.name;

  updateStudentCounts();

  showStudentRoutes();

  showTransportPass();

  loadComplaintBuses();

  showMyComplaints();
}

/* STUDENT COUNTS */

function updateStudentCounts() {
  const buses = getData("buses");

  const routes = getData("routes");

  const user = currentUser();

  const complaints = getData("complaints").filter(function (item) {
    return item.studentId === user.id;
  });

  document.getElementById("totalBuses").textContent = buses.length;

  document.getElementById("totalRoutes").textContent = routes.length;

  document.getElementById("totalComplaints").textContent = complaints.length;
}

/* STUDENT ROUTES */

function showStudentRoutes() {
  const container = document.getElementById("studentRoutes");

  if (!container) return;

  const routes = getData("routes");

  const search = (
    document.getElementById("routeSearch").value || ""
  ).toLowerCase();

  const filtered = routes.filter(function (route) {
    return (
      route.name.toLowerCase().includes(search) ||
      route.bus.toLowerCase().includes(search) ||
      route.start.toLowerCase().includes(search) ||
      route.end.toLowerCase().includes(search)
    );
  });

  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = "<p>No routes found.</p>";

    return;
  }

  filtered.forEach(function (route) {
    const stops = route.stops
      .map(function (stop) {
        return `
                                <span class="stop">
                                    ${stop}
                                </span>
                            `;
      })
      .join("");

    container.innerHTML += `

                <div class="route-card">

                    <h3>
                        ${route.name}
                    </h3>

                    <p>
                        🚌 Bus:
                        ${route.bus}
                    </p>

                    <p>
                        ⏰ Time:
                        ${route.time}
                    </p>


                    <div class="route-info">

                        <div>
                            <strong>
                                Start
                            </strong>

                            <p>
                                ${route.start}
                            </p>
                        </div>


                        <div>
                            <strong>
                                Destination
                            </strong>

                            <p>
                                ${route.end}
                            </p>
                        </div>

                    </div>


                    <div class="stops">

                        <strong>
                            Stops:
                        </strong>

                        <br>

                        ${stops}

                    </div>

                </div>

            `;
  });
}

/* TRANSPORT PASS */

function showTransportPass() {
  const user = currentUser();

  const container = document.getElementById("transportPass");

  container.innerHTML = `

        <div class="pass">

            <h2>
                🎫 College Transport Pass
            </h2>

            <div class="pass-grid">

                <div>

                    <strong>
                        Student Name
                    </strong>

                    <p>
                        ${user.name}
                    </p>

                </div>


                <div>

                    <strong>
                        Roll Number
                    </strong>

                    <p>
                        ${user.roll}
                    </p>

                </div>


                <div>

                    <strong>
                        Email
                    </strong>

                    <p>
                        ${user.email}
                    </p>

                </div>


                <div>

                    <strong>
                        Status
                    </strong>

                    <p>
                        ACTIVE
                    </p>

                </div>

            </div>

        </div>

    `;
}

/* LOAD BUSES IN COMPLAINT */

function loadComplaintBuses() {
  const select = document.getElementById("complaintBus");

  const buses = getData("buses");

  select.innerHTML = `<option value="">
            Select bus
        </option>`;

  buses.forEach(function (bus) {
    select.innerHTML += `

                <option value="${bus.number}">
                    ${bus.number}
                </option>

            `;
  });
}

/* COMPLAINT */

const complaintForm = document.getElementById("complaintForm");

if (complaintForm) {
  complaintForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const user = currentUser();

    const complaints = getData("complaints");

    complaints.push({
      id: Date.now(),

      studentId: user.id,

      studentName: user.name,

      type: document.getElementById("complaintType").value,

      bus: document.getElementById("complaintBus").value,

      description: document.getElementById("complaintDescription").value,

      status: "Pending",

      date: new Date().toLocaleString(),
    });

    saveData("complaints", complaints);

    alert("Complaint submitted successfully");

    complaintForm.reset();

    updateStudentCounts();

    showMyComplaints();
  });
}

/* MY COMPLAINTS */

function showMyComplaints() {
  const container = document.getElementById("myComplaints");

  if (!container) return;

  const user = currentUser();

  const complaints = getData("complaints").filter(function (item) {
    return item.studentId === user.id;
  });

  container.innerHTML = "";

  if (complaints.length === 0) {
    container.innerHTML = "<p>No complaints submitted.</p>";

    return;
  }

  complaints.forEach(function (item) {
    container.innerHTML += `

                <div class="complaint">

                    <h3>
                        ${item.type}
                    </h3>

                    <p>
                        Bus:
                        ${item.bus}
                    </p>

                    <p>
                        ${item.description}
                    </p>

                    <span class="status
                        ${
                          item.status === "Pending"
                            ? "pending"
                            : item.status === "Resolved"
                              ? "resolved"
                              : "progress"
                        }">

                        ${item.status}

                    </span>

                </div>

            `;
  });
}

/* ==========================================
   ADMIN
========================================== */

if (location.pathname.endsWith("admin.html")) {
  loadAdmin();
}

function loadAdmin() {
  const user = currentUser();

  if (!user || user.role !== "admin") {
    location.href = "index.html";

    return;
  }

  updateAdminCounts();

  showBuses();

  showRoutes();

  showStudents();

  showAdminComplaints();
}

/* ADMIN COUNTS */

function updateAdminCounts() {
  const users = getData("users");

  const students = users.filter(function (user) {
    return user.role === "student";
  });

  document.getElementById("adminStudentsCount").textContent = students.length;

  document.getElementById("adminBusesCount").textContent =
    getData("buses").length;

  document.getElementById("adminRoutesCount").textContent =
    getData("routes").length;

  document.getElementById("adminComplaintsCount").textContent =
    getData("complaints").length;
}

/* ADD BUS */

const busForm = document.getElementById("busForm");

if (busForm) {
  busForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const buses = getData("buses");

    buses.push({
      id: Date.now(),

      number: document.getElementById("busNumber").value,

      registration: document.getElementById("busRegistration").value,

      capacity: document.getElementById("busCapacity").value,
    });

    saveData("buses", buses);

    alert("Bus added successfully");

    busForm.reset();

    showBuses();

    updateAdminCounts();
  });
}

/* SHOW BUSES */

function showBuses() {
  const container = document.getElementById("busList");

  if (!container) return;

  const buses = getData("buses");

  let html = `

        <div class="table-wrapper">

        <table>

            <tr>

                <th>
                    Bus Number
                </th>

                <th>
                    Registration
                </th>

                <th>
                    Capacity
                </th>

                <th>
                    Action
                </th>

            </tr>

    `;

  buses.forEach(function (bus) {
    html += `

                <tr>

                    <td>
                        ${bus.number}
                    </td>

                    <td>
                        ${bus.registration}
                    </td>

                    <td>
                        ${bus.capacity}
                    </td>

                    <td>

                        <button
                            class="delete"
                            onclick="
                                deleteBus(
                                    ${bus.id}
                                )
                            ">

                            Delete

                        </button>

                    </td>

                </tr>

            `;
  });

  html += `
        </table>
        </div>
    `;

  container.innerHTML = html;
}

/* DELETE BUS */

function deleteBus(id) {
  let buses = getData("buses");

  buses = buses.filter(function (bus) {
    return bus.id !== id;
  });

  saveData("buses", buses);

  showBuses();

  updateAdminCounts();
}

/* ADD ROUTE */

const routeForm = document.getElementById("routeForm");

if (routeForm) {
  routeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const routes = getData("routes");

    const stops = document
      .getElementById("routeStops")
      .value.split(",")
      .map(function (stop) {
        return stop.trim();
      });

    routes.push({
      id: Date.now(),

      name: document.getElementById("routeName").value,

      bus: document.getElementById("routeBus").value,

      start: document.getElementById("routeStart").value,

      end: document.getElementById("routeEnd").value,

      stops: stops,

      time: document.getElementById("routeTime").value,
    });

    saveData("routes", routes);

    alert("Route added successfully");

    routeForm.reset();

    showRoutes();

    updateAdminCounts();
  });
}

/* SHOW ROUTES */

function showRoutes() {
  const container = document.getElementById("routeList");

  if (!container) return;

  const routes = getData("routes");

  container.innerHTML = "";

  routes.forEach(function (route) {
    container.innerHTML += `

                <div class="route-card">

                    <h3>
                        ${route.name}
                    </h3>

                    <p>
                        🚌 ${route.bus}
                    </p>

                    <p>
                        📍
                        ${route.start}
                        →
                        ${route.end}
                    </p>

                    <p>
                        ⏰ ${route.time}
                    </p>

                    <div class="stops">

                        ${route.stops
                          .map(function (stop) {
                            return `
                                        <span class="stop">
                                            ${stop}
                                        </span>
                                    `;
                          })
                          .join("")}

                    </div>


                    <button
                        class="delete"
                        onclick="
                            deleteRoute(
                                ${route.id}
                            )
                        ">

                        Delete Route

                    </button>

                </div>

            `;
  });
}

/* DELETE ROUTE */

function deleteRoute(id) {
  let routes = getData("routes");

  routes = routes.filter(function (route) {
    return route.id !== id;
  });

  saveData("routes", routes);

  showRoutes();

  updateAdminCounts();
}

/* SHOW STUDENTS */

function showStudents() {
  const container = document.getElementById("studentList");

  if (!container) return;

  const students = getData("users").filter(function (user) {
    return user.role === "student";
  });

  if (students.length === 0) {
    container.innerHTML = "<p>No students registered.</p>";

    return;
  }

  let html = `

        <div class="table-wrapper">

        <table>

            <tr>

                <th>
                    Name
                </th>

                <th>
                    Roll Number
                </th>

                <th>
                    Email
                </th>

            </tr>

    `;

  students.forEach(function (student) {
    html += `

                <tr>

                    <td>
                        ${student.name}
                    </td>

                    <td>
                        ${student.roll}
                    </td>

                    <td>
                        ${student.email}
                    </td>

                </tr>

            `;
  });

  html += `
        </table>
        </div>
    `;

  container.innerHTML = html;
}

/* SHOW ADMIN COMPLAINTS */

function showAdminComplaints() {
  const container = document.getElementById("adminComplaints");

  if (!container) return;

  const complaints = getData("complaints");

  container.innerHTML = "";

  if (complaints.length === 0) {
    container.innerHTML = "<p>No complaints available.</p>";

    return;
  }

  complaints.forEach(function (item) {
    container.innerHTML += `

                <div class="complaint">

                    <h3>
                        ${item.type}
                    </h3>

                    <p>
                        Student:
                        ${item.studentName}
                    </p>

                    <p>
                        Bus:
                        ${item.bus}
                    </p>

                    <p>
                        ${item.description}
                    </p>


                    <select
                        onchange="
                            changeComplaintStatus(
                                ${item.id},
                                this.value
                            )
                        ">

                        <option
                            value="Pending"
                            ${item.status === "Pending" ? "selected" : ""}>

                            Pending

                        </option>


                        <option
                            value="In Progress"
                            ${item.status === "In Progress" ? "selected" : ""}>

                            In Progress

                        </option>


                        <option
                            value="Resolved"
                            ${item.status === "Resolved" ? "selected" : ""}>

                            Resolved

                        </option>

                    </select>

                </div>

            `;
  });
}

/* CHANGE COMPLAINT STATUS */

function changeComplaintStatus(id, status) {
  const complaints = getData("complaints");

  const complaint = complaints.find(function (item) {
    return item.id === id;
  });

  if (!complaint) return;

  complaint.status = status;

  saveData("complaints", complaints);

  showAdminComplaints();
}

/* ==========================================
   DRIVER
========================================== */

if (location.pathname.endsWith("driver.html")) {
  loadDriver();
}

function loadDriver() {
  const user = currentUser();

  if (!user || user.role !== "driver") {
    location.href = "index.html";

    return;
  }

  document.getElementById("driverName").textContent = user.name;

  const buses = getData("buses");

  const routes = getData("routes");

  const bus = buses.find(function (item) {
    return item.number === user.bus;
  });

  const route = routes.find(function (item) {
    return item.bus === user.bus;
  });

  if (!bus || !route) {
    document.getElementById("driverAssignment").innerHTML =
      "<p>No assignment found.</p>";

    return;
  }

  document.getElementById("driverBus").textContent = bus.number;

  document.getElementById("driverRoute").textContent = route.name;

  document.getElementById("driverTime").textContent = route.time;

  const status = localStorage.getItem("tripStatus") || "Not Started";

  document.getElementById("driverStatus").textContent = status;

  document.getElementById("driverAssignment").innerHTML = `

            <div class="route-card">

                <h3>
                    ${route.name}
                </h3>

                <p>
                    Bus:
                    ${bus.number}
                </p>

                <p>
                    Registration:
                    ${bus.registration}
                </p>

                <p>
                    Capacity:
                    ${bus.capacity}
                </p>

                <p>
                    Departure:
                    ${route.time}
                </p>

            </div>

        `;

  const stops = document.getElementById("driverStops");

  stops.innerHTML = "";

  route.stops.forEach(function (stop, index) {
    stops.innerHTML += `

                <div class="stop-item">

                    ${index + 1}.
                    ${stop}

                </div>

            `;
  });
}

/* DRIVER STATUS */

function setTripStatus(status) {
  localStorage.setItem("tripStatus", status);

  const statusElement = document.getElementById("driverStatus");

  if (statusElement) {
    statusElement.textContent = status;
  }

  const message = document.getElementById("tripMessage");

  if (message) {
    message.textContent = "Trip status updated to: " + status;
  }
}


// clock

function updateClock() {
  const now = new Date();
  document.getElementById("clock").innerText = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// data Structure . resources, districts or suppliers ka data store karne ke
let districts = [];
let waterSuppliers = [];
let electricitySuppliers = [];
let internetSuppliers = [];
let waterChannels = [];
let electricityChannels = [];
let internetChannels = [];

 // OPEN / CLOSE FORMS
 
 function openForm(type) {
  closeForm(); // close any existing form
  const container = document.getElementById("forms-container");
  let html = "";

  if (type === "districtForm") {
    html = `
      <div class="modal" id="modalForm">
        <h2>Add District</h2>
        <label>Name</label><input id="dName">
        <label>Water Needs (24 comma-separated)</label><input id="dWater">
        <label>Electricity Needs (24 comma-separated)</label><input id="dElec">
        <label>Internet Needs (24 comma-separated)</label><input id="dNet">
        <label><input type="checkbox" id="dCritical"> Critical?</label>
        <button onclick="addDistrict()">Add</button>
        <button onclick="closeForm()">Cancel</button>
      </div>`;
  }

  if (type === "waterSupplierForm") {
    html = `
      <div class="modal" id="modalForm">
        <h2>Add Water Supplier</h2>
        <label>Name</label><input id="wName">
        <label>Capacity</label><input id="wCap" type="number">
        <label>Cost per unit</label><input id="wCost" type="number">
        <button onclick="addWaterSupplier()">Add</button>
        <button onclick="closeForm()">Cancel</button>
      </div>`;
  }

  if (type === "electricitySupplierForm") {
    html = `
      <div class="modal" id="modalForm">
        <h2>Add Electricity Supplier</h2>
        <label>Name</label><input id="eName">
        <label>Capacity</label><input id="eCap" type="number">
        <label>Cost per unit</label><input id="eCost" type="number">
        <button onclick="addElectricitySupplier()">Add</button>
        <button onclick="closeForm()">Cancel</button>
      </div>`;
  }

  if (type === "internetSupplierForm") {
    html = `
      <div class="modal" id="modalForm">
        <h2>Add Internet Supplier</h2>
        <label>Name</label><input id="iName">
        <label>Capacity</label><input id="iCap" type="number">
        <label>Cost per unit</label><input id="iCost" type="number">
        <button onclick="addInternetSupplier()">Add</button>
        <button onclick="closeForm()">Cancel</button>
      </div>`;
  }

  if (type === "waterChannelForm") {
    html = generateChannelForm("Water");
  }

  if (type === "electricityChannelForm") {
    html = generateChannelForm("Electricity");
  }

  if (type === "internetChannelForm") {
    html = generateChannelForm("Internet");
  }

  container.innerHTML = html;
  document.getElementById("modalForm").style.display = "block";
}

function closeForm() {
  document.getElementById("forms-container").innerHTML = "";
}

// CHANNEL FORM GENERATOR

function generateChannelForm(type) {
  let options = districts.map(d => `<option value="${d.name}">${d.name}</option>`).join("");
  return `
    <div class="modal" id="modalForm">
      <h2>Add ${type} Channel</h2>
      <label>Name</label><input id="cName">
      <label>Max Transfer Rate</label><input id="cRate" type="number">
      <label>Districts (hold Ctrl to select multiple)</label>
      <select id="cDistricts" multiple>${options}</select>
      <button onclick="add${type}Channel()">Add</button>
      <button onclick="closeForm()">Cancel</button>
    </div>`;
}

 // ADD FUNCTIONS
 
function addDistrict() {
  let obj = {
    name: document.getElementById("dName").value,
    water: document.getElementById("dWater").value.split(",").map(Number),
    elec: document.getElementById("dElec").value.split(",").map(Number),
    net: document.getElementById("dNet").value.split(",").map(Number),
    critical: document.getElementById("dCritical").checked
  };
  districts.push(obj);
  updateDistrictTable();
  closeForm();
}

function addWaterSupplier() {
  let obj = {
    name: document.getElementById("wName").value,
    capacity: +document.getElementById("wCap").value,
    cost: +document.getElementById("wCost").value
  };
  waterSuppliers.push(obj);
  updateWaterSupplierTable();
  closeForm();
}

function addElectricitySupplier() {
  let obj = {
    name: document.getElementById("eName").value,
    capacity: +document.getElementById("eCap").value,
    cost: +document.getElementById("eCost").value
  };
  electricitySuppliers.push(obj);
  updateElectricitySupplierTable();
  closeForm();
}

function addInternetSupplier() {
  let obj = {
    name: document.getElementById("iName").value,
    capacity: +document.getElementById("iCap").value,
    cost: +document.getElementById("iCost").value
  };
  internetSuppliers.push(obj);
  updateInternetSupplierTable();
  closeForm();
}

function addWaterChannel() {
  let selected = Array.from(document.getElementById("cDistricts").selectedOptions).map(o => o.value);
  let obj = {
    name: document.getElementById("cName").value,
    rate: +document.getElementById("cRate").value,
    districts: selected
  };
  waterChannels.push(obj);
  updateWaterChannelTable();
  closeForm();
}

function addElectricityChannel() {
  let selected = Array.from(document.getElementById("cDistricts").selectedOptions).map(o => o.value);
  let obj = {
    name: document.getElementById("cName").value,
    rate: +document.getElementById("cRate").value,
    districts: selected
  };
  electricityChannels.push(obj);
  updateElectricityChannelTable();
  closeForm();
}

function addInternetChannel() {
  let selected = Array.from(document.getElementById("cDistricts").selectedOptions).map(o => o.value);
  let obj = {
    name: document.getElementById("cName").value,
    rate: +document.getElementById("cRate").value,
    districts: selected
  };
  internetChannels.push(obj);
  updateInternetChannelTable();
  closeForm();
}

 // UPDATE TABLES
 
 function updateDistrictTable() {
  let tbody = document.querySelector("#districtTable tbody");
  tbody.innerHTML = "";
  districts.forEach(d => {
    let row = `<tr>
      <td>${d.name}</td>
      <td>${d.water.join(",")}</td>
      <td>${d.elec.join(",")}</td>
      <td>${d.net.join(",")}</td>
      <td>${d.critical ? "Yes" : "No"}</td>
      <td><button onclick="openEventForm('${d.name}')">Add Event</button></td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

function updateWaterSupplierTable() {
  let tbody = document.querySelector("#waterSupplierTable tbody");
  tbody.innerHTML = "";
  waterSuppliers.forEach(s => {
    tbody.innerHTML += `<tr><td>${s.name}</td><td>${s.capacity}</td><td>${s.cost}</td></tr>`;
  });
}

function updateElectricitySupplierTable() {
  let tbody = document.querySelector("#electricitySupplierTable tbody");
  tbody.innerHTML = "";
  electricitySuppliers.forEach(s => {
    tbody.innerHTML += `<tr><td>${s.name}</td><td>${s.capacity}</td><td>${s.cost}</td></tr>`;
  });
}

function updateInternetSupplierTable() {
  let tbody = document.querySelector("#internetSupplierTable tbody");
  tbody.innerHTML = "";
  internetSuppliers.forEach(s => {
    tbody.innerHTML += `<tr><td>${s.name}</td><td>${s.capacity}</td><td>${s.cost}</td></tr>`;
  });
}

function updateWaterChannelTable() {
  let tbody = document.querySelector("#waterChannelTable tbody");
  tbody.innerHTML = "";
  waterChannels.forEach(c => {
    tbody.innerHTML += `<tr><td>${c.name}</td><td>${c.rate}</td><td>${c.districts.join(",")}</td></tr>`;
  });
}

function updateElectricityChannelTable() {
  let tbody = document.querySelector("#electricityChannelTable tbody");
  tbody.innerHTML = "";
  electricityChannels.forEach(c => {
    tbody.innerHTML += `<tr><td>${c.name}</td><td>${c.rate}</td><td>${c.districts.join(",")}</td></tr>`;
  });
}

function updateInternetChannelTable() {
  let tbody = document.querySelector("#internetChannelTable tbody");
  tbody.innerHTML = "";
  internetChannels.forEach(c => {
    tbody.innerHTML += `<tr><td>${c.name}</td><td>${c.rate}</td><td>${c.districts.join(",")}</td></tr>`;
  });
}

 // AUTO GENERATE DATA

 function autoGenerateData() {
  districts = [
    {name:"Central", water:random24(50,100), elec:random24(200,300), net:random24(20,40), critical:true},
    {name:"North", water:random24(40,80), elec:random24(150,250), net:random24(10,25), critical:false},
    {name:"South", water:random24(30,70), elec:random24(120,220), net:random24(15,30), critical:false}
  ];
  waterSuppliers = [
    {name:"WaterCorp", capacity:200, cost:2},
    {name:"HydroFlow", capacity:150, cost:3}
  ];
  electricitySuppliers = [
    {name:"PowerGrid", capacity:500, cost:5},
    {name:"ElectroMax", capacity:400, cost:6}
  ];
  internetSuppliers = [
    {name:"NetFast", capacity:100, cost:4},
    {name:"FiberPro", capacity:80, cost:5}
  ];
  waterChannels = [
    {name:"WChannel1", rate:100, districts:["Central","North"]},
    {name:"WChannel2", rate:80, districts:["South"]}
  ];
  electricityChannels = [
    {name:"EChannel1", rate:200, districts:["Central","South"]},
    {name:"EChannel2", rate:250, districts:["North"]}
  ];
  internetChannels = [
    {name:"IChannel1", rate:60, districts:["Central","South"]},
    {name:"IChannel2", rate:50, districts:["North"]}
  ];

  updateDistrictTable();
  updateWaterSupplierTable();
  updateElectricitySupplierTable();
  updateInternetSupplierTable();
  updateWaterChannelTable();
  updateElectricityChannelTable();
  updateInternetChannelTable();
}

function random24(min,max){
  let arr=[];
  for(let i=0;i<24;i++){
    arr.push(Math.floor(Math.random()*(max-min+1))+min);
  }
  return arr;
}


// GENERATE PLAN

function generatePlan(){
  let output = "<h2>Resource Allocation Plan</h2>";
  let hours = ["12AM","1AM","2AM","3AM","4AM","5AM","6AM","7AM","8AM","9AM","10AM","11AM",
               "12PM","1PM","2PM","3PM","4PM","5PM","6PM","7PM","8PM","9PM","10PM","11PM"];

  let unmet = [];

  districts.forEach(d=>{
    output += `<h3>District: ${d.name} ${d.critical?"(Critical)":""}</h3>`;
    output += `<table border='1'><tr><th>Hour</th><th>Water Allocation</th><th>Electricity Allocation</th><th>Internet Allocation</th></tr>`;
    for(let h=0;h<24;h++){
      // simplified greedy allocation (not full optimization)
      let waterAlloc = allocate(d.water[h],waterSuppliers,waterChannels,d.name);
      let elecAlloc  = allocate(d.elec[h],electricitySuppliers,electricityChannels,d.name);
      let netAlloc   = allocate(d.net[h],internetSuppliers,internetChannels,d.name);

      if(waterAlloc.unmet>0 || elecAlloc.unmet>0 || netAlloc.unmet>0){
        unmet.push({district:d.name,hour:hours[h], water:waterAlloc.unmet, elec:elecAlloc.unmet, net:netAlloc.unmet});
      }

      output += `<tr><td>${hours[h]}</td>
                 <td>${waterAlloc.text}</td>
                 <td>${elecAlloc.text}</td>
                 <td>${netAlloc.text}</td></tr>`;
    }
    output+="</table>";
  });

  if(unmet.length>0){
    output+="<h2>Unmet Demand Reporting</h2><table border='1'><tr><th>District</th><th>Hour</th><th>Water</th><th>Electricity</th><th>Internet</th></tr>";
    unmet.forEach(u=>{
      output+=`<tr><td>${u.district}</td><td>${u.hour}</td><td>${u.water}</td><td>${u.elec}</td><td>${u.net}</td></tr>`;
    });
    output+="</table>";
  }

  document.getElementById("planOutput").innerHTML=output;
}

function allocate(demand,suppliers,channels,district){
  // only channels that can serve this district
  let validChannels = channels.filter(c=>c.districts.includes(district));
  if(validChannels.length===0) return {text:"No channel", unmet:demand};

  let channelCap = Math.min(...validChannels.map(c=>c.rate));
  let remaining = demand;
  let text="";

  // sort suppliers by cost
  let supSorted = suppliers.slice().sort((a,b)=>a.cost-b.cost);

  for(let sup of supSorted){
    if(remaining<=0) break;
    let supply = Math.min(remaining,sup.capacity,channelCap);
    if(supply>0){
      text+=`${sup.name} via ${validChannels[0].name}: ${supply} units; `;
      remaining-=supply;
    }
  }

  if(text==="") text="Not Supplied";

  return {text:text, unmet:remaining>0?remaining:0};
}


// PDF GENERATION


function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let y = 10;

  doc.setFontSize(14);
  doc.text("Resource Distribution Simulator Report", 10, y);
  y += 10;

  // Districts
  doc.setFontSize(12);
  doc.text("Districts", 10, y);
  y += 6;
  districts.forEach(d => {
    doc.text(`Name: ${d.name} | Critical: ${d.critical ? "Yes" : "No"}`, 10, y);
    y += 6;
    doc.setFontSize(10);
    doc.text(`Water: ${d.water.join(", ")}`, 12, y); y += 6;
    doc.text(`Electricity: ${d.elec.join(", ")}`, 12, y); y += 6;
    doc.text(`Internet: ${d.net.join(", ")}`, 12, y); y += 8;
    doc.setFontSize(12);
  });

  // Suppliers
  doc.text("Water Suppliers", 10, y); y += 6;
  waterSuppliers.forEach(s => { doc.text(`${s.name} | Cap: ${s.capacity} | Cost: ${s.cost}`, 12, y); y += 6; });
  y += 6;

  doc.text("Electricity Suppliers", 10, y); y += 6;
  electricitySuppliers.forEach(s => { doc.text(`${s.name} | Cap: ${s.capacity} | Cost: ${s.cost}`, 12, y); y += 6; });
  y += 6;

  doc.text("Internet Suppliers", 10, y); y += 6;
  internetSuppliers.forEach(s => { doc.text(`${s.name} | Cap: ${s.capacity} | Cost: ${s.cost}`, 12, y); y += 6; });
  y += 6;

  // Channels
  doc.text("Water Channels", 10, y); y += 6;
  waterChannels.forEach(c => { doc.text(`${c.name} | Rate: ${c.rate} | Districts: ${c.districts.join(",")}`, 12, y); y += 6; });
  y += 6;

  doc.text("Electricity Channels", 10, y); y += 6;
  electricityChannels.forEach(c => { doc.text(`${c.name} | Rate: ${c.rate} | Districts: ${c.districts.join(",")}`, 12, y); y += 6; });
  y += 6;

  doc.text("Internet Channels", 10, y); y += 6;
  internetChannels.forEach(c => { doc.text(`${c.name} | Rate: ${c.rate} | Districts: ${c.districts.join(",")}`, 12, y); y += 6; });
  y += 10;

  // Plan Output
  let planText = document.getElementById("planOutput").innerText;
  let splitText = doc.splitTextToSize(planText, 180);
  doc.text(splitText, 10, y);

  doc.save("Resource_Distribution_Report.pdf");
}



// EVENT FORM (UPDATE DEMAND)

function openEventForm(districtName) {
  closeForm(); 
  const district = districts.find(d => d.name === districtName);
  if (!district) return;

  const container = document.getElementById("forms-container");
  const hours = [
    "12AM","1AM","2AM","3AM","4AM","5AM","6AM","7AM","8AM","9AM","10AM","11AM",
    "12PM","1PM","2PM","3PM","4PM","5PM","6PM","7PM","8PM","9PM","10PM","11PM"
  ];

  let rows = '';
  for (let i = 0; i < 24; i++) {
    rows += `
      <div class="event-row">
        <div>${hours[i]}</div>
        <input type="number" id="eventWater${i}" value="${district.water[i]}" placeholder="Water">
        <input type="number" id="eventElec${i}" value="${district.elec[i]}" placeholder="Electricity">
        <input type="number" id="eventNet${i}" value="${district.net[i]}" placeholder="Internet">
      </div>
    `;
  }

  const html = `
    <div class="modal" id="modalForm">
      <h2>Update Event — ${district.name}</h2>
      <div class="modal-body">
        <div class="event-grid-header">
          <div>Time</div><div>Water</div><div>Electricity</div><div>Internet</div>
        </div>
        ${rows}
      </div>
      <div class="actions">
        <button onclick="saveEvent('${districtName}')">Save</button>
        <button onclick="closeForm()">Cancel</button>
      </div>
    </div>
  `;

  container.innerHTML = html;
  document.getElementById("modalForm").style.display = "block";
}

function saveEvent(districtName) {
  const district = districts.find(d => d.name === districtName);
  if (!district) return;

  for (let i = 0; i < 24; i++) {
    district.water[i] = parseInt(document.getElementById(`eventWater${i}`).value) || 0;
    district.elec[i]  = parseInt(document.getElementById(`eventElec${i}`).value) || 0;
    district.net[i]   = parseInt(document.getElementById(`eventNet${i}`).value) || 0;
  }

  updateDistrictTable();   // refresh table
  generatePlan();          // regenerate plan
  closeForm();             // close modal
}

function closeForm() {
  document.getElementById("forms-container").innerHTML = "";
}


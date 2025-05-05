class Plane {
    constructor(id, number, brand, seats, speed, range) 
    {
        this.id = id;
        this.number = number;
        this.brand = brand;
        this.seats = seats;
        this.speed = speed;
        this.range = range;
    }

    edit(number, brand, seats, speed, range) 
    {
        this.number = number;
        this.brand = brand;
        this.seats = parseInt(seats);
        this.speed = speed;
        this.range = range;
    }

    displayAsTableRow() 
    {
        return `
            <tr>
                <td>${this.number}</td>
                <td>${this.brand}</td>
                <td>${this.seats}</td>
                <td>${this.speed}</td>
                <td>${this.range}</td>
                <td>
                    <button data-id="${this.id}" class="edit-plane btn btn-warning">Редагувати</button>
                    <button data-id="${this.id}" class="delete-plane btn btn-danger">Видалити</button>
                </td>
            </tr>
        `;
    }

    displayAsOption() 
    {
        return `<option value="${this.number}">${this.number}</option>`;
    }
}

class Route 
{
    constructor(id, from, to, distance, duration) 
    {
        this.id = id;
        this.from = from;
        this.to = to;
        this.distance = distance;
        this.duration = duration;
    }

    edit(from, to, distance, duration) 
    {
        this.from = from;
        this.to = to;
        this.distance = distance;
        this.duration = duration;
    }

    displayAsTableRow() 
    {
        return `
            <tr>
                <td>${this.from}</td>
                <td>${this.to}</td>
                <td>${this.distance}</td>
                <td>${this.duration}</td>
                <td>
                    <button data-id="${this.id}" class="edit-route btn btn-warning">Редагувати</button>
                    <button data-id="${this.id}" class="delete-route btn btn-danger">Видалити</button>
                </td>
            </tr>
        `;
    }
}

class Flight 
{
    constructor(id, plane, departure, arrival, tickets) 
    {
        this.id = id;
        this.plane = plane;
        this.departure = departure;
        this.arrival = arrival;
        this.tickets = tickets;
    }

    edit(plane, departure, arrival, tickets) 
    {
        this.plane = plane;
        this.departure = departure;
        this.arrival = arrival;
        this.tickets = parseInt(tickets);
    }

    displayAsTableRow() 
    {
        return `
            <tr>
                <td>${this.plane}</td>
                <td>${this.departure}</td>
                <td>${this.arrival}</td>
                <td>${this.tickets}</td>
                <td>
                    <button data-id="${this.id}" class="edit-flight btn btn-warning">Редагувати</button>
                    <button data-id="${this.id}" class="delete-flight btn btn-danger">Видалити</button>
                </td>
            </tr>
        `;
    }
}

class BaseList 
{
    constructor() 
    {
        this.id = 1;
        this.list = [];
    }

    edit(dataObj) 
    {
        for (let i = 0; i < this.list.length; i++) 
            {
            if (dataObj.id == this.list[i].id) 
            {
                this.list[i].edit(...Object.values(dataObj));
                break;
            }
        }
    }

    delete(id) 
    {
        for (let i = 0; i < this.list.length; i++) 
        {
            if (id == this.list[i].id) 
            {
                this.list.splice(i, 1);
                break;
            }
        }
    }

    displayTableRows() 
    {
        let content = ``;
        for (let i = 0; i < this.list.length; i++) 
        {
            content += this.list[i].displayAsTableRow();
        }
        return content;
    }

    displaySelectOptions() 
    {
        let content = ``;
        for (let i = 0; i < this.list.length; i++) 
        {
            content += this.list[i].displayAsOption();
        }
        return content;
    }

    getById(id) 
    {
        for (let i = 0; i < this.list.length; i++) 
        {
            if (id == this.list[i].id) 
            {
                return this.list[i];
            }
        }
    }
}

class PlaneList extends BaseList 
{
    constructor() 
    {
        super();
        this.add({ number: "A320", brand: "Airbus", seats: 180, speed: "840 км/год", range: "6000 км" });
        this.add({ number: "B737", brand: "Boeing", seats: 160, speed: "820 км/год", range: "5500 км" });
        this.add({ number: "E195", brand: "Embraer", seats: 120, speed: "780 км/год", range: "4200 км" });
    }

    add(dataObj) 
    {
        dataObj.id = this.id++;
        let plane = new Plane(dataObj.id, dataObj.number, dataObj.brand, dataObj.seats, dataObj.speed, dataObj.range);
        this.list.push(plane);
    }

    display() 
    {
        const planeTab = document.getElementById('planes');
        let planeTabContent = `
            <h3>Літаки</h3>
            <button id="addPlanes" class="btn btn-success" data-toggle="modal" data-target="#planeModal">Додати</button>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Номер</th>
                        <th>Марка</th>
                        <th>Кількість місць</th>
                        <th>Швидкість</th>
                        <th>Максимальна дальність</th>
                        <th>Дії</th>
                    </tr>
                </thead>
                <tbody>
        `;
        planeTabContent += this.displayTableRows();
        planeTabContent += `</tbody></table>`;
        planeTab.innerHTML = planeTabContent;
    }
}

class RouteList extends BaseList 
{
    constructor() 
    {
        super();
        this.add({ from: "Івано-Франківськ", to: "Цюріх", distance: "1560км", duration: "12 год" });
        this.add({ from: "Цюріх", to: "Бухарест", distance: "1800км", duration: "14год XB" });
    }

    add(dataObj) 
    {
        dataObj.id = this.id++;
        let route = new Route(dataObj.id, dataObj.from, dataObj.to, dataObj.distance, dataObj.duration);
        this.list.push(route);
    }

    display() 
    {
        const routeTab = document.getElementById('routes');
        let routeTabContent = `
            <h3>Маршрути</h3>
            <button id="addRoutes" class="btn btn-success" data-toggle="modal" data-target="#routeModal">Додати</button>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Пункт вильоту</th>
                        <th>Пункт призначення</th>
                        <th>Відстань</th>
                        <th>Тривалість</th>
                        <th>Дії</th>
                    </tr>
                </thead>
                <tbody>
        `;
        routeTabContent += this.displayTableRows();
        routeTabContent += `</tbody></table>`;
        routeTab.innerHTML = routeTabContent;
    }
}

class FlightList extends BaseList 
{
    constructor(planeList) 
    {
        super();
        this.planeList = planeList;
        this.add({ plane: "A320", departure: "2025-04-10 14:00", arrival: "2025-04-10 18:00", tickets: 150 });
        this.add({ plane: "B737", departure: "2025-04-11 09:30", arrival: "2025-04-11 13:45", tickets: 130 });
        this.add({ plane: "E195", departure: "2025-04-12 07:00", arrival: "2025-04-12 11:15", tickets: 100 });
    }

    add(dataObj) 
    {
        dataObj.id = this.id++;
        let flight = new Flight(dataObj.id, dataObj.plane, dataObj.departure, dataObj.arrival, dataObj.tickets);
        this.list.push(flight);
    }

    display() 
    {
        const flightTab = document.getElementById('flights');
        const flightSelect = document.getElementById('flightPlaneInput');
        let flightTabContent = `
            <h3>Рейси</h3>
            <button id="addFlights" class="btn btn-success" data-toggle="modal" data-target="#flightModal">Додати</button>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Літак</th>
                        <th>Дата, час вильоту</th>
                        <th>Дата, час прибуття</th>
                        <th>Кількість проданих квитків</th>
                        <th>Дії</th>
                    </tr>
                </thead>
                <tbody>
        `;
        flightTabContent += this.displayTableRows();
        flightTabContent += `</tbody></table>`;
        flightTab.innerHTML = flightTabContent;

        flightSelect.innerHTML = this.planeList.list.map(plane => plane.displayAsOption()).join('');
    }
}

const planeList = new PlaneList();
const routeList = new RouteList();
const flightList = new FlightList(planeList);

planeList.display();
routeList.display();
flightList.display();

document.addEventListener('click', function (e) 
{
    if (e.target.classList.contains('delete-plane')) 
    {
        e.preventDefault();
        let elementId = e.target.getAttribute('data-id');
        planeList.delete(elementId);
        planeList.display();
        flightList.display();
    } else if (e.target.classList.contains('delete-flight')) 
    {
        e.preventDefault();
        let elementId = e.target.getAttribute('data-id');
        flightList.delete(elementId);
        flightList.display();
    } else if (e.target.classList.contains('delete-route')) 
    {
        e.preventDefault();
        let elementId = e.target.getAttribute('data-id');
        routeList.delete(elementId);
        routeList.display();
    } else if (e.target.classList.contains('edit-plane')) 
    {
        e.preventDefault();
        let elementId = e.target.getAttribute('data-id');
        let plane = planeList.getById(elementId);
        document.getElementById('planeIdInput').value = plane.id;
        document.getElementById('planeNumberInput').value = plane.number;
        document.getElementById('planeBrandInput').value = plane.brand;
        document.getElementById('planeSeatsInput').value = plane.seats;
        document.getElementById('planeSpeedInput').value = plane.speed;
        document.getElementById('planeRangeInput').value = plane.range;
        document.getElementById('addPlanes').click();
    } else if (e.target.classList.contains('edit-flight')) 
    {
        e.preventDefault();
        let elementId = e.target.getAttribute('data-id');
        let flight = flightList.getById(elementId);
        document.getElementById('flightIdInput').value = flight.id;
        document.getElementById('flightPlaneInput').value = flight.plane;
        document.getElementById('flightDepartureInput').value = flight.departure;
        document.getElementById('flightArrivalInput').value = flight.arrival;
        document.getElementById('flightTicketsInput').value = flight.tickets;
        document.getElementById('addFlights').click();
    } else if (e.target.classList.contains('edit-route')) 
    {
        e.preventDefault();
        let elementId = e.target.getAttribute('data-id');
        let route = routeList.getById(elementId);
        document.getElementById('routeIdInput').value = route.id;
        document.getElementById('routeDepartureInput').value = route.from;
        document.getElementById('routeArrivalInput').value = route.to;
        document.getElementById('routeDistanceInput').value = route.distance;
        document.getElementById('routeDurationInput').value = route.duration;
        document.getElementById('addRoutes').click();
    }
});

document.addEventListener('submit', function (e) 
{
    if (e.target.id == "planeForm") 
    {
        e.preventDefault();
        let id = document.getElementById('planeIdInput').value;
        let newPlane = 
        {
            id: id,
            number: document.getElementById('planeNumberInput').value,
            brand: document.getElementById('planeBrandInput').value,
            seats: document.getElementById('planeSeatsInput').value,
            speed: document.getElementById('planeSpeedInput').value,
            range: document.getElementById('planeRangeInput').value
        };
        if (id == "") 
        {
            planeList.add(newPlane);
        } else 
        {
            planeList.edit(newPlane);
        }
        planeList.display();
        flightList.display();
        document.getElementById('planeIdInput').value = "";
        document.getElementById('planeForm').reset();
        document.getElementById('closePlaneModal').click();
    } else if (e.target.id == "flightForm") 
    {
        e.preventDefault();
        let id = document.getElementById('flightIdInput').value;
        let newFlight = 
        {
            id: id,
            plane: document.getElementById('flightPlaneInput').value,
            departure: document.getElementById('flightDepartureInput').value,
            arrival: document.getElementById('flightArrivalInput').value,
            tickets: document.getElementById('flightTicketsInput').value
        };
        if (id == "") 
        {
            flightList.add(newFlight);
        } else 
        {
            flightList.edit(newFlight);
        }
        flightList.display();
        document.getElementById('flightIdInput').value = "";
        document.getElementById('flightForm').reset();
        document.getElementById('closeFlightModal').click();
    } else if (e.target.id == "routeForm") 
    {
        e.preventDefault();
        let id = document.getElementById('routeIdInput').value;
        let newRoute = 
        {
            id: id,
            from: document.getElementById('routeDepartureInput').value,
            to: document.getElementById('routeArrivalInput').value,
            distance: document.getElementById('routeDistanceInput').value,
            duration: document.getElementById('routeDurationInput').value
        };
        if (id == "") 
        {
            routeList.add(newRoute);
        } else 
        {
            routeList.edit(newRoute);
        }
        routeList.display();
        document.getElementById('routeIdInput').value = "";
        document.getElementById('routeForm').reset();
        document.getElementById('closeRouteModal').click();
    }
});
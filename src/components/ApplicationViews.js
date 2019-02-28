import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './animal/AnimalList'
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnerList from './owner/OwnerList'

class ApplicationViews extends Component {
    state = {
        owners: [],
        animalOwners: [],
        employees: [],
        animals: [],
        locations: []
    }

    dischargeAnimal = (id) => {
        fetch(`http://localhost:8088/animals/${id}`, {
            "method": "DELETE"
        })
        .then(() => fetch("http://localhost:8088/animals"))
        .then(r => r.json())
        .then(animals => this.setState({ animals: animals }))
    }

    fireEmployee = (id) => {
        fetch(`http://localhost:8088/employees/${id}`, {
            "method": "DELETE"
        })
        .then(() => fetch("http://localhost:8088/employees"))
        .then(r => r.json())
        .then(employees => this.setState({ employees: employees }))
    }

    removeOwner = (id) => {
        fetch(`http://localhost:8088/owners/${id}`, {
            "method": "DELETE"
        })
        .then(() => fetch("http://localhost:8088/owners"))
        .then(r => r.json())
        .then(owners => this.setState({ owners: owners }))
    }

    // //TEST CODE
    // postNewAnimal =() => {
    //     return fetch("http://localhost:8088/animals", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify()
    //     })
    // }
    // const animalName = document.querySelector("#animalName__input").value
    //     createAnimal = (id, animalName ) => {
    //         return {
    //         id: id,
    //         animalName: animalName
    //         }
    //     }

    // //END OF TEST CODE


    getAllAnimalsAgain =  () => {
        fetch("http://localhost:8088/animals")
            .then(r => r.json())
            .then(animals => this.setState({ animals: animals }))
    }

    componentDidUpdate () {
        console.log("componentDidUpdate -- ApplicationViews")
    }

    componentDidMount() {
        console.log("componentDidMount -- ApplicationViews")
        const newState = {}

        fetch("http://localhost:8088/animals")
            .then(r => r.json())
            .then(animals => newState.animals = animals)
            .then(() => fetch("http://localhost:8088/employees")
            .then(r => r.json()))
            .then(employees => newState.employees = employees)
            .then(() => fetch("http://localhost:8088/locations")
            .then(r => r.json()))
            .then(locations => newState.locations = locations)
            .then(() => fetch("http://localhost:8088/owners")
            .then(r => r.json()))
            .then(owners => newState.owners = owners)
            .then(() => fetch("http://localhost:8088/animalOwners")
            .then(r => r.json()))
            .then(animalOwners => newState.animalOwners = animalOwners)
            .then(() => this.setState(newState))
    }

    render() {
        console.clear()
        console.log("render -- ApplicationViews")
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <LocationList locations={this.state.locations} />
                }} />
                <Route path="/animals" render={(props) => {
                    return <AnimalList animals={this.state.animals}
                                owners={this.state.owners}
                                animalOwners={this.state.animalOwners}
                                dischargeAnimal={this.dischargeAnimal}
                                loadAnimals={this.getAllAnimalsAgain}
                                />
                }} />
                <Route path="/employees" render={(props) => {
                    return <EmployeeList
                        fireEmployee={this.fireEmployee}
                        employees={this.state.employees}
                        />
                }} />
                <Route exact path="/owners" render={(props) => {
                    return <OwnerList
                    removeOwner={this.removeOwner}
                    owners={this.state.owners} />
                }} />
            </React.Fragment>
        )
    }
}

export default ApplicationViews
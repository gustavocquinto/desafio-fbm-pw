import { faker } from "@faker-js/faker/locale/pt_BR";
import { randomInt } from "crypto";


export class Employee{ 
    firstName: string;
    middleName: string;
    lastName: string;
    id: number;
    constructor(firstName: string, middleName: string, lastName: string, id: number = randomInt(99999999)){
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName
        this.id = id;
    }

}
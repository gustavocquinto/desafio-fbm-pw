import { Employee } from "../models/employee_model";
import { faker } from "@faker-js/faker/locale/pt_BR";

export class EmployeeFactory{

    employee(firstName: string, middleName: string, lastName: string, id?: number){
        return new Employee(firstName, middleName, lastName);
    }

    randomEmployee(){
        const randomFirstName = faker.person.firstName();
        const randomMiddleName = faker.person.middleName();
        const randomLastName = faker.person.lastName();
        return new Employee(randomFirstName, randomMiddleName, randomLastName);
    }
}
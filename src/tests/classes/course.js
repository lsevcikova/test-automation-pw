export class Course {
    constructor(name, teacher) {
        this._name = name;
        this._teacher = teacher;
        this._students = []; 
    }

    get name() {
        return this._name;
    }

    get teacher() {
        return this._teacher;
    }

     get student() {
        return this._students;
    }
}
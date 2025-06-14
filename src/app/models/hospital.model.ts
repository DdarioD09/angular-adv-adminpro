interface _HospitalUser {
    _id: string;
    name: string;
    img: string;
}

export class Hospital {
    constructor(
        public name: string,
        public _id?: string,
        public user?: _HospitalUser,
        public img?: string,
    ) { }

}
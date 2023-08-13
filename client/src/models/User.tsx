class User {
    _id: string | undefined;
    username: string | undefined;
    name: string | undefined;
    email: string | undefined;
    phone: string | undefined;
    address: string | undefined;
    password: string | undefined;
    roles: string[] | undefined;
    points: number | undefined;

    constructor(username: string, name: string, password: string | undefined, email: string, address: string, phone: string) {
        this.username = username;
        this.name = name;
        this.password = password;
        this.email = email;
        this.address = address;
        this.phone = phone;
    }
}

export default User;
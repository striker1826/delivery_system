export class OwnerOutputDto {
    private id: number;
    private ownerId: string;
    private password: string;

    get _id() {
        return this.id;
    }

    get _password() {
        return this.password;
    }
}

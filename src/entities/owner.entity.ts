import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Owner {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;

    @Column({ type: "varchar", name: "ownerId" })
    ownerId: string;

    @Column({ type: "varchar", name: "password" })
    password: string;
}

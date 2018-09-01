import * as bcrypt from "bcryptjs";
import { IsEmail, IsNotEmpty } from "class-validator";
import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { UserType } from "../enum";

@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    firstName: string;

    @Column()
    @IsNotEmpty()
    lastName: string;

    @Column()
    @IsNotEmpty()
    secret: string;

    @Column()
    @IsNotEmpty()
    passwordIsTemporary: boolean;

    @Column("enum", { enum: UserType })
    authorization: UserType;

    @Column()
    @Index()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    //
    // ─── Functions ───────────────────────────────────────────────────────────────────────────
    //

    comparePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.secret);
    }

    static findByEmail(email: string): Promise<User | undefined> {
        return this.findOne({
            where: { email },
        });
    }
}

import {
    BaseEntity,
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    ManyToMany,
    JoinColumn,
    OneToMany,
} from "typeorm";
import { IsNotEmpty } from "class-validator";
import { User } from "./user";
import { Sex, FacultyMemberType, ActivityType } from "../enum";
import { Subject } from "./subject";
import { Presentation } from "./presentation";
import { Recognition } from "./recognition";
import { InstructionalMaterial } from "./instructional_material";
import { ExtensionWork } from "./extension_work";
import { Degree } from "./degree";

@Entity()
export class FacultyMember extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;

    @Column("enum", { enum: Sex })
    sex: Sex;

    @Column("enum", { enum: FacultyMemberType })
    type: FacultyMemberType;

    @Column("enum", { enum: ActivityType })
    activity: ActivityType;

    @Column("date")
    @IsNotEmpty()
    birthDate: string;

    @ManyToMany((type?: any) => Subject, (s: Subject) => s.specializedFaculty)
    specializedSubjects: Subject[];

    @OneToMany((type?: any) => Presentation, (p: Presentation) => p.facultyMember)
    presentations: Presentation[];

    @OneToMany((type?: any) => Recognition, (r: Recognition) => r.facultyMember)
    recognitions: Recognition[];

    @OneToMany(
        (type?: any) => InstructionalMaterial,
        (im: InstructionalMaterial) => im.facultyMember,
    )
    instructionalMaterials: InstructionalMaterial[];

    @OneToMany((type?: any) => ExtensionWork, (ew: ExtensionWork) => ew.facultyMember)
    extensionWorks: ExtensionWork[];

    @OneToMany((type?: any) => Degree, (d: Degree) => d.facultyMember)
    degrees: Degree[];
}
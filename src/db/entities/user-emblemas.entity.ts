import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsersEntity } from "./users.entity";
import { EmblemasEntity } from "./emblemas.entity";

@Entity('users_emblemas')
export class UserEmblemaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsersEntity, user => user.emblemas)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @ManyToOne(() => EmblemasEntity, emblema => emblema.users)
  @JoinColumn({ name: 'emblema_id' })
  emblema: EmblemasEntity;
}
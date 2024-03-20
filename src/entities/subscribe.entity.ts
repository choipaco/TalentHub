import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import UsersEntity from "./auth.entity";

@Entity({ name: 'subscribe' })
export default class SubscribeEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'uuid' })
  uuid: string;
  
  @ManyToOne(() => UsersEntity,{onDelete: 'CASCADE'})
  @JoinColumn({ name: 'user_uuid' })
  user: UsersEntity;

  @ManyToOne(() => UsersEntity,{onDelete: 'CASCADE'})
  @JoinColumn({ name: 'uploader_uuid' },)
  uploader: UsersEntity;
}

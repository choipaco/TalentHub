import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import UsersEntity from "./auth.entity";
import ContentEntity from "./contents.entity";

@Entity({ name: 'comments' })
export default class CommentEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'uuid' })
  uuid: string;

  @Column({ name: 'comment', type: 'text', nullable: false })
  comment: string;

  @CreateDateColumn({type: "timestamp", name: 'createdAt'})
  createdAt: Date;
  
  @ManyToOne(() => UsersEntity, user => user.comments, {onDelete: 'CASCADE', onUpdate: "CASCADE"})
  user: UsersEntity;

  @ManyToOne(() => ContentEntity, content => content.comments, {onDelete: 'CASCADE', onUpdate: "CASCADE"})
  contents: ContentEntity;
}

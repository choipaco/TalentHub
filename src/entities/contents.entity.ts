import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import UsersEntity from "./auth.entity";
import CommentEntity from "./comments.entity";

@Entity({ name: 'contents' })
export default class ContentEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'uuid' })
  uuid: string;

  @Column({name: "thumbnail", type: "varchar"})
  thumbnail: string;

  @Column({name: "video", type: "varchar"})
  video: string;

  @Column({ name: 'title', type: 'varchar', nullable: false })
  title: string;

  @Column({ name: 'content', type: 'text', nullable: false })
  explanation: string;

  @Column({ name: "views", type: "int", nullable: false, default: 0})
  views: number;

  @CreateDateColumn({type: "timestamp", name: 'createdAt'})
  createdAt: Date

  @ManyToOne(() => UsersEntity, user => user.contents, {onDelete: 'CASCADE',onUpdate: "CASCADE"})
  user: UsersEntity;

  @OneToMany(() =>  CommentEntity, comments => comments.contents, {onDelete: 'CASCADE',onUpdate: "CASCADE"})
  comments: CommentEntity[]
}

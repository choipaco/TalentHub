import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import CommentsEntity from "./comments.entity";
import ContentEntity from "./contents.entity";
@Entity({ name: 'users' })
export default class UsersEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'uuid' })
  uuid: string;

  @Column({ name: 'id', type: 'varchar', length: 40, nullable: false, unique: true })
  id: string;

  @Column({ name: 'email', type: 'varchar', length: 40, nullable: false, unique: true })
  email: string;

  @Column({name: 'name', type: 'varchar', length: 5, nullable: false, })
  name: string

  @Column({ name: 'pw', type: 'text', nullable: false })
  pw: string;

  @OneToMany(() =>  CommentsEntity, comment => comment.user)
  comments: CommentsEntity[]

  @OneToMany(() =>  ContentEntity, content => content.user)
  contents: ContentEntity[]
}
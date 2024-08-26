import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  filename!: string;

  @CreateDateColumn()
  uploaded_at!: Date;
}

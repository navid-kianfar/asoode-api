import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ length: 36 }) id: string;
  @Column({ length: 128 }) username: string;
  @Column({ length: 128 }) hash: string;
  @Column({ length: 64 }) first_name: string;
  @Column({ length: 64 }) last_name: string;
  @Column({ default: true }) is_active: boolean;
  @CreateDateColumn() created_at: Date;
  @UpdateDateColumn() updated_at?: Date;
  @DeleteDateColumn() deleted_at?: Date;
}

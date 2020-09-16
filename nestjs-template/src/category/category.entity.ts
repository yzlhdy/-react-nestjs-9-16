import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column } from 'typeorm'

@Entity('category')
export class CategoryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ comment: '创建时间' })
    created: Date;

    @Column({ comment: '分类名称' })
    name: string;
}
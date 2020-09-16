import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity()
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    created: Date;

    @Column({ type: 'text', comment: '名称' })
    name: string;

    @Column({ type: "text", comment: '简介' })
    desc: string;

    @Column({ type: 'int', comment: '金额' })
    price: number;

    @Column({ type: 'int', comment: '状态' })
    status: number;

    @Column({
        type: 'text',
        comment: '详情'
    })
    detail: string;

    @Column({ comment: '图片' })
    images: string;

}
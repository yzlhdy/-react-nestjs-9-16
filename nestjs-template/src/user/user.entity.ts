import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert } from 'typeorm'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ comment: '创建时间' })
    created: Date;

    @Column({ comment: '名称' })
    username: string;

    @Column({ comment: '密码' })
    password: string

    @Column({ comment: '性别' })
    age: string;

    @Column({ length: 100, nullable: true, comment: '爱好' })
    breed: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10)
    }

    async comparePassword(attempa: string) {
        return await bcrypt.compare(attempa, this.password)
    }

    toResponseObject(showToken: boolean) {
        const { id, username, created, age, breed, token } = this
        const responseObject: any = {
            id, username, created, age, breed
        }
        if (showToken) {
            responseObject.token = token
        }
        return responseObject
    }

    /**
     *
     *
     * @readonly 制作token 令牌
     * @private
     * @memberof UserEntity
     */
    private get token() {
        const { id, username } = this
        return jwt.sign({
            id, username
        }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })
    }
}
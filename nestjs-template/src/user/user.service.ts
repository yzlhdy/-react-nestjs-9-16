import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDTO, UserRO } from './user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }

    async showAll() {
        const user = await (await this.userRepository.find()).map(user => user.toResponseObject(false))
        return user
    }

    /**
     *
     *
     * @param {UserDTO} data{username-用户名 password-密码}
     * @returns {Promise<UserRO>}
     * @memberof UserService
     */
    async login(data: UserDTO): Promise<UserRO> {
        const { username, password } = data
        const user = await this.userRepository.findOne({ where: { username } })
        if (!user || !(await user.comparePassword(password))) {
            throw new HttpException('username/password error', HttpStatus.BAD_REQUEST)
        }
        return user.toResponseObject(true)
    }


    /**
     *
     * 
     * @param {UserRO} data
     * @returns {Promise<UserRO>} 注册接口jk
     * @memberof UserService
     */
    async register(data: UserRO): Promise<UserRO> {
        const { username } = data
        let user = await this.userRepository.findOne({ where: { username } })
        if (user) {
            throw new HttpException('用户名不存在', HttpStatus.BAD_REQUEST)
        }
        user = await this.userRepository.create(data)
        await this.userRepository.save(user)
        return user.toResponseObject(false)
    }
}

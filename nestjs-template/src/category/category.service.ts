import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { Repository } from 'typeorm';
import { UserDTO } from 'src/user/user.dto';
import { CategoryRO, CategoryDTO, CateList } from './category.dto';

@Injectable()
export class CategoryService {

    constructor(@InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>) { }

    async categoryList(pages: CateList): Promise<CategoryRO[]> {
        const { page } = pages
        const category = await this.categoryRepository.find({
            take: 10,
            skip: 25 * (page - 1)
        })
        return category
    }

    async create(data: CategoryDTO): Promise<CategoryRO> {

        let category = await this.categoryRepository.create(data)
        await this.categoryRepository.save(category)
        return category
    }

    async updated(id: string, data: CategoryDTO): Promise<CategoryRO> {
        let category = await this.categoryRepository.findOne({ where: { id } })
        if (!category) {
            throw new HttpException('不存在', HttpStatus.BAD_REQUEST)
        }
        await this.categoryRepository.update({ id }, data)
        category = await this.categoryRepository.findOne({ where: { id } })
        return category
    }

    async deleted(id: string): Promise<any> {
        let category = this.categoryRepository.findOne({ where: { id } })
        if (!category) {
            throw new HttpException('不存在', HttpStatus.BAD_REQUEST)
        }
        await this.categoryRepository.delete({ id })
    }

}

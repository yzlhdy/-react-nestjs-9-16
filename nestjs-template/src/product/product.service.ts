import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDTO, ProLimi, SearchDto } from './product.dto';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {

    constructor(@InjectRepository(ProductEntity) private readonly productREpository: Repository<ProductEntity>) { }

    async productList(pages: ProLimi) {
        const { page } = pages
        const product = await this.productREpository.find({
            order: {
                id: 'DESC'
            },
            take: 25,
            skip: 25 * (page - 1)
        })
        return product
    }


    async create(data: ProductDTO) {
        const product = await this.productREpository.create(data)
        await this.productREpository.save(product)
        return product
    }

    async updated(id: string, data: ProductDTO) {
        let product = await this.productREpository.findOne({ where: { id } })
        if (!product) {
            throw new HttpException('不存在', HttpStatus.BAD_REQUEST)
        }
        await this.productREpository.update({ id }, data)
        product = await this.productREpository.findOne({ where: { id } })
        return product
    }

    async delete(id: string) {
        const product = await this.productREpository.findOne({ where: { id } })
        if (!product) {

            throw new HttpException('不存在', HttpStatus.BAD_REQUEST)
        }
        await this.productREpository.delete({ id })
        return product
    }

    async serachs(data: SearchDto): Promise<ProductEntity[]> {
        const { desc, name, page } = data
        // const products = await this.productREpository.createQueryBuilder('product').andWhere(
        //     [`product.${name}LIKE`]: desc,
        //     { [name]: `%${desc}%` }
        // )
        const produ = await this.productREpository.find({
            where: { [name]: desc },
            order: {
                id: 'DESC'
            },
            take: 25,
            skip: 25 * (page - 1)
        })

        return produ
    }
}

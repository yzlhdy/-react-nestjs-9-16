import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductDTO, ProLimi, SearchDto } from './product.dto';
import { ProductService } from './product.service';

@Controller('product')
@ApiTags('商品管理')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    showAll(@Query() page: ProLimi) {
        return this.productService.productList(page)
    }

    @Post()
    create(@Body() data: ProductDTO) {
        return this.productService.create(data)
    }

    @Put(':id')
    updated(@Param('id') id: string, @Body() data: ProductDTO) {
        return this.productService.updated(id, data)
    }

    @Delete(':id')
    deleted(@Param('id') id: string) {
        return this.productService.delete(id)
    }

    @Post('search')
    search(@Body() data: SearchDto) {
        return this.productService.serachs(data)
    }
}

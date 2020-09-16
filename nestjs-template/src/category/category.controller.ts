import { Controller, Param, Query, Get, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDTO, CateList } from './category.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/shared/auth.guard';

@Controller('category')
@ApiTags('商品类别')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get()
    @UseGuards(new AuthGuard())
    categoryList(@Query() page: CateList) {
        return this.categoryService.categoryList({ ...page })
    }

    @Post()
    @UseGuards(new AuthGuard())
    create(@Body() data: CategoryDTO) {
        return this.categoryService.create(data)
    }

    @Put(':id')
    @UseGuards(new AuthGuard())
    update(@Param('id') id: string, @Body() data: CategoryDTO) {
        return this.categoryService.updated(id, data)
    }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    deleted(@Param('id') id: string) {
        return this.categoryService.deleted(id)
    }
}

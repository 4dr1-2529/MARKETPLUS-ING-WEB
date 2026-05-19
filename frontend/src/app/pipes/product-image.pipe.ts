import { Pipe, PipeTransform } from '@angular/core';
import { getProductImageUrl } from '../utils/product-image.util';

@Pipe({ name: 'productImage' })
export class ProductImagePipe implements PipeTransform {
    transform(product: any): string {
        return getProductImageUrl(product || {});
    }
}

export class ProductPrismaFilter {
  static build(search?: string, status?:number) {
    const where: any = {};

    if (search) {
      where.name = {
        contains: search,
      };
    }

    return where;
  }
}
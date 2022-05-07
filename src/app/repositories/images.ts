import { AppDataSource } from "./dataSource";
import { Image } from './entities'

export const ImagesRepo = AppDataSource.getRepository(Image);
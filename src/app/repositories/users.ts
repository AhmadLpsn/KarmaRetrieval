import { AppDataSource } from "./dataSource";
import { User } from "./entities";
import { ImagesRepo } from "./images";

export const UsersRepo = AppDataSource.getRepository(User).extend({

    async getUserRank(userId: number, numOfUserToShow: number, limit, offset) {
        const users = this.metadata.name;
        const images = ImagesRepo.metadata.name;
        let query = ""
        query += "WITH orderd AS (";
        query += "SELECT *, row_number() OVER (ORDER BY karmaScore DESC) as rk ";
        query += `FROM ${users}), `;
        query += "_count as (select count(*) as num from orderd), ";
        query += " _target as (select orderd.rk, orderd.rk + LEAST(num-orderd.rk,?) as top, orderd.rk - LEAST(orderd.rk,?) as floor from orderd,_count where orderd.id=?), ";
        query += "_result as ( ";
        query += "select orderd.* ";
        query += `from _target,orderd `;
        query += "where (orderd.rk >= _target.rk and orderd.rk <= (top+(?-(_target.rk-floor))))";
        query += "or (orderd.rk < _target.rk and orderd.rk >= (floor-(?-(top-_target.rk))))";
        query += "limit ? offset ? )";
        query += `select _result.id, username, rk, karmaScore,  ${images}.url as image `;
        query += `from _result join ${images} on  ${images}.id = _result.image_id`;
        var result: any[] = await this.query(query, [...new Array(4).fill(Math.floor(numOfUserToShow / 2)), userId, limit, offset]);
        return result;
    }
});
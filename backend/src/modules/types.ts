import { EntityTarget } from 'typeorm'

export type _User = EntityTarget<'User'>
export type _Blog = EntityTarget<'Blog'>
export type _Service = EntityTarget<'Service'>

export type Entities = _User | _Blog | _Service
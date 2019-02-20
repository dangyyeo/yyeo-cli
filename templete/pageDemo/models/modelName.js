import modelExtend from 'dva-model-extend';
import { query, remove, update, create } from '@/services/{{servicePath}}';
import baseModelCreator from '@/common/base';

const methods = {
    update: {
        method: update,
    },
    query: {
        method: query,
    },
    delete: {
        method: remove,
    },
    create: {
        method: create,
    },
};

export default modelExtend(baseModelCreator('{{servicePath}}_index', methods, 'id', '{{generateName}}'), {
    namespace: '{{generateName}}',
});

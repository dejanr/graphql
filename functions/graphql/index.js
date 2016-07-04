import runGraphQL from '../../src/index';
import lamda from 'apex.js';

export default lamda(event => runGraphQL(event));

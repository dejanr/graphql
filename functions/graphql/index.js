import lamda from 'apex.js';
import runGraphQL from '../../src/index';

export default lamda(event => runGraphQL(event));

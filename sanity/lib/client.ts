import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token:"sksXMOPc5Ta1Semd0Ytrq5DcGbdNXDFrr2EUPpC7GrGbsqpQRK4VdSQNTYsF15c8IQSWAqnc5wqyFEujB67Jhtat7L5jWCTgl2u9DtHHzHbQVmgE4YkSsxPqTpKo9dwY1taRWkyCjW8DX2ywJTc5YLHG1dT5Wp1HBtK0vKQlLul1B4Vb1bMF",
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

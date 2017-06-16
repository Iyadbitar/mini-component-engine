const InitialState = {
  config: {},
  jobs: {
    data: [],
    meta: {}
  },
  jobDetails: {},
  uiState: {
    activeAsync: false,
    sort: {
      sortBy: 'job__',
      order: 'DESC'
    },
    search: {
      searchIn: 'all',
      searchValue: ''
    },
    pagination: {
      page: 1,
      pageSize: 50
    }
  }
}

export default InitialState

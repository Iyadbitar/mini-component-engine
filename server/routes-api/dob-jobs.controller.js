
var DBService = require('../../database/db-service');

const DobJobsController = function(){}
const BASIC_FIELDS = ['id', 'job__', 'doc__', 'borough', 'house__', 'street_name', 'block', 'lot'];
const EXTRA_FIELDS = [
  'applicant_license__',
  'applicant_professional_title',
  'applicant_s_first_name',
  'applicant_s_last_name',
  'assigned',
  'bin__',
  'boiler',
  'building_type',
  'city_',
  'city_owned',
  'community___board',
  'curb_cut',
  'dobrundate',
  'efiling_filed',
  'enlargement_sq_footage',
  'equipment',
  'existing_dwelling_units',
  'existing_height',
  'existing_occupancy',
  'existing_zoning_sqft',
  'existingno_of_stories',
  'fee_status',
  'fire_alarm',
  'fire_suppression',
  'fuel_burning',
  'fuel_storage',
  'fully_paid',
  'initial_cost',
  'job_description',
  'job_status',
  'job_status_descrp',
  'job_type',
  'latest_action_date',
  'mechanical',
  'other',
  'other_description',
  'owner_s_business_name',
  'owner_s_first_name',
  'owner_s_house_number',
  'owner_s_last_name',
  'owner_shouse_street_name',
  'owner_sphone__',
  'paid',
  'plumbing',
  'pre__filing_date',
  'professional_cert',
  'proposed_dwelling_units',
  'proposed_height',
  'proposed_no_of_stories',
  'proposed_occupancy',
  'proposed_zoning_sqft',
  'sprinkler',
  'standpipe',
  'state',
  'street_frontage',
  'total_est__fee',
  'zip',
  'approved',
  'site_fill',
  'zoning_dist1',
  'fully_permitted',
  'landmarked',
  'zoning_dist2',
  'special_district_1',
  'non_profit',
  'zoning_dist3',
  'special_district_2',
  'horizontal_enlrgmt',
  'little_e',
  'loft_board',
  'vertical_enlrgmt'
]
const ALL_FIELDS = [...BASIC_FIELDS, ...EXTRA_FIELDS]

const DEFAULTS = {
  orderBy: 'job__',
  order: 'DESC',
  pageSize: 20,
  page: 1
}

DobJobsController.prototype.getDobJobs = function (req, res) {
  db = new DBService();

  let meta = Object.assign({}, DEFAULTS, req.query);

  if(ALL_FIELDS.indexOf(meta.orderBy) < 0) {
    meta.orderBy = 'job__';
  }

  if(['ASC', 'DESC'].indexOf(meta.order.toUpperCase()) < 0) {
    meta.order = 'DESC';
  }

  meta.pageSize = parseInt(meta.pageSize, 10) || 20;
  meta.page = parseInt(meta.page, 10) || 1;

  let limitStart = (meta.page - 1) * meta.pageSize;
  let limitEnd = limitStart + meta.pageSize;
  let where = '';
  if(meta.searchValue){
    where = ALL_FIELDS.reduce( (acc, field) => {
      return acc + `OR ${field} LIKE '%${meta.searchValue}%' `;
    }, 'WHERE 1=2 ')
  }

  const countQuery = `SELECT COUNT(id) AS total FROM jobs ${where}`;
  const dataQuery = `SELECT ${BASIC_FIELDS.join(', ')} from jobs ${where} ORDER BY ${meta.orderBy} ${meta.order} LIMIT ${limitStart}, ${limitEnd}`;

  Promise.all([db.query(dataQuery), db.query(countQuery)])
  .then( result => {
      const data = result[0];
      const total = result[1][0].total;

      meta.total = total;
      meta.totalPages = Math.ceil(total / meta.pageSize)

      res.json( {
        data, meta
      });
  })
  .catch(error => {
    console.log(error)
    res.status(500).send();
  })
}

DobJobsController.prototype.getJob = function (req, res) {
  db = new DBService();
  let id = parseInt(req.params.jobId, 10);

  if(!id) {
    id = 0;
  }
  const dataQuery = `SELECT ${ALL_FIELDS.join(', ')} from jobs WHERE id = ${id}`;
  db.query(dataQuery).then(job => res.json(job[0]));
}

DobJobsController.prototype.getSchema = function (req, res) {
  res.json(ALL_FIELDS)
}

module.exports = DobJobsController;

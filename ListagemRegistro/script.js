const baseUrl = 'http://localhost:3000'

async function init() {
  const [roles, employees] = await Promise.all([
    fetchJson(`${baseUrl}/roles`),
    fetchJson(`${baseUrl}/employees`)
  ])
  initRoles(roles)
  updateEmployees(employees, roles)

  const div = document.querySelector('.conteudo')
  div.addEventListener('change', () => updateEmployees(employees, roles))
}
init()

function fetchJson(url) {
  return fetch(url).then(resp => {
    if (resp.ok) {
      return resp.json()
    } else {
      throw new Error('Erro ao carregar dados ' + resp.statusText)
    }
  })
}

function initRoles(roles) {
  const fsRoles = document.getElementById('fsRoles')

  for (const role of roles) {
    const label = document.createElement('label')

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.value = role.id

    label.append(checkbox, role.name)
    fsRoles.append(label)
  }
}

function updateEmployees(employees, roles) {
  const checkboxes = document.querySelectorAll('input:checked')
  const rolesIds = []

  for (let i = 0; i < checkboxes.length; i++) {
    rolesIds.push(parseInt(checkboxes[i].value))
  }

  const filteredEmployees = employees.filter(employee => {
    if (rolesIds.length === 0) {
      return true
    } else {
      return rolesIds.indexOf(employee.role_id) !== -1
    }
  })

  const sortBy = document.getElementById('sortBy').value
  filteredEmployees.sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return compare(a.name, b.name)
      case 'name-desc':
        return -compare(a.name, b.name)
      case 'salary-asc':
        return compare(a.salary, b.salary)
      case 'salary-desc':
        return -compare(a.salary, b.salary)
    }
  })

  const tbody = document.querySelector('tbody')
  tbody.innerHTML = ''

  for (const employee of filteredEmployees) {
    const tr = document.createElement('tr')

    const tdId = document.createElement('td')
    tdId.textContent = employee.id

    const tdName = document.createElement('td')
    tdName.textContent = employee.name

    const tdRole = document.createElement('td')
    const role = roles.find(role => role.id === employee.role_id)
    tdRole.textContent = role.name

    const tdSalary = document.createElement('td')
    tdSalary.textContent = employee.salary

    tr.append(tdId, tdName, tdRole, tdSalary)
    tbody.append(tr)
  }
  document.getElementById('counterEmployees').textContent = '(' + filteredEmployees.length + ')'
}

function compare(v1, v2) {
  if (v1 < v2) {
    return -1
  } else if (v1 > v2) {
    return 1
  } else {
    return 0
  }
}

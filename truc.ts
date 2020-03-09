function checkRep(valid_id: string[], false_id: string[]): boolean {
    let valid = true
    valid_id.forEach(function (id)  {
        if ((!document.getElementById(id)! as any).checked) {
            valid = false;
        }
    })
    false_id.forEach(function (id)  {
        if ((document.getElementById(id)!as any).checked) {
            valid = false
        }
    })
    return valid
}
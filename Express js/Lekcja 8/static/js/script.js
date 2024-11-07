function editRecord(button, id, number, insurance, gasoline, damaged, drive){

    let orginalRecord = button.parentNode.parentNode
    let recordInnerCopy = orginalRecord.innerHTML
    orginalRecord.innerHTML = `
    <form id="form${id}">
    </form>
    <input type='hidden' name='id' value='${id}' form="form${id}">
    <td>${number}</td>
    <td>
        <select name='insurance' id='insurance${id}' form="form${id}">
            <option value="TAK">TAK</option>
            <option value="NIE">NIE</option>
            <option value="BRAKDANYCH">BRAKDANYCH</option>
        </select>
    </td>
    <td>
        <select name='gasoline' id='gasoline${id}' form="form${id}">
            <option value="TAK">TAK</option>
            <option value="NIE">NIE</option>
            <option value="BRAKDANYCH">BRAKDANYCH</option>
        </select>
    </td>
    <td>
        <select name='damaged' id='damaged${id}' form="form${id}">
            <option value="TAK">TAK</option>
            <option value="NIE">NIE</option>
            <option value="BRAKDANYCH">BRAKDANYCH</option>
        </select>
    </td>
    <td>
        <select name='drive' id='drive${id}' form="form${id}">
            <option value="TAK">TAK</option>
            <option value="NIE">NIE</option>
            <option value="BRAKDANYCH">BRAKDANYCH</option>
        </select>
    </td>
    <td>
        <button id="update${id}" type="submit" class="redBtn" onclick="return confirm('czy zaktualizować?')" formaction="/update" form="form${id}">UPDATE</button>
    </td>
    <td>
        <button id="cancel${id}" class="blueBtn">CANCEL</button>
    </td>
    `
    console.log(button)
    document.getElementById('insurance'+id).value = insurance
    document.getElementById('gasoline'+id).value = gasoline
    document.getElementById('damaged'+id).value = damaged
    document.getElementById('drive'+id).value = drive
    document.getElementById('cancel'+id).onclick = function() {
        orginalRecord.innerHTML = recordInnerCopy
    }
}
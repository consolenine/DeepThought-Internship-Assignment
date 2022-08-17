window.onload =  async function() {
    const data = await loadJSON();
    var taskCount = 0;
    data.tasks.forEach(el => {
        taskCount++;
        //Add container for each task to DOM
        $(".jic-content-top").append(`
        <div class="jic-content-container jic-task-container" id="${el.task_id}">
        <div class="jic-task-heading">${el.task_title}</div></div>
        `);
        $('.jmc-content-container').append(
            `<div class="jic-content-header fg-b-90 collapsed"><b>${taskCount}. ${el.task_title}</b></div>
            <div class="jic-task-content-container collapsed" id="${el.task_id}taskCount">
            <ul style="margin-left: 10px">
            </ul>
            </div>
            `
        );
        //Add subcontainers
        el.assets.forEach(asset => {
            let inner = generateAssetContainer(asset);
            $(`#${el.task_id}`).append(inner);
            $(`#${el.task_id}taskCount > ul`).append(`<a href="#${asset.asset_id}"><li class="jmc-task-item border-top-1">${asset.asset_title}</li></a>`);
        })

    })

    //Handle hiding and showing journey menu list
    document.querySelector('.jmc-expand-ico').addEventListener('click', () => {
        document.querySelectorAll('.journeyMenuContainer .hideable').forEach(el => {
            el.classList.toggle('inactive');
        })
        document.querySelector('.journeyMenuContainer').classList.toggle('inactive');
        $('.jmc-content-container .jic-content-header').toggleClass('collapsed');
        $('.jic-task-content-container').toggleClass('collapsed');
    })

    //Handle hiding and showing description of task assets
    document.querySelectorAll('.desc-expand-ico').forEach(el => {
        el.addEventListener('click', () => {
            $(el).parent().siblings('.collapsable').toggle();
            $(el).toggleClass('collapsed');
        });
    })

}

async function loadJSON() {
    const requestURL = 'projects.json';
    const request = new Request(requestURL);
    const response = await fetch(request);
    return await response.json();
}

function generateAssetContainer(asset) {
    if (asset.asset_type == "display_asset") {
        switch (asset.asset_content) {
            case "reflection": {
                return `
                <div class="jic-content-sub verticalFlex b-shdw-t1 br-10 display_content-type1" id="6234">
                <div class="jic-content-header jic-content-sub-header bg-b-90">${asset.asset_title}</div>
                <div class="jic-content-container jic-content-sub-container fg-b-90">
                    <p>${asset.display_asset_reflection}</p>
                </div>
                <div class="jic-description-container collapsable fg-b-90">${asset.asset_description}</div>
                <div class="jic-content-footer"><i class="fa-solid fa-angle-down collapsed desc-expand-ico"></i></div>
                </div>`;
            }
            case "other": {
                return `
                <div class="jic-content-sub verticalFlex b-shdw-t1 br-10 display_content-type1" id="6234">
                    <div class="jic-content-header jic-content-sub-header bg-b-90">${asset.asset_title}</div>
                    <div class="display-asset-container" id="${asset.asset_id}">
                    ${asset.display_asset_docs ? `<div class="pdf-container"><embed src="${asset.display_asset_docs}" controls></embed></div>`: ''}
                    ${asset.display_asset_image ? `<div class="gif-container"><img src="${asset.display_asset_image}" ></img></div>`: ''}
                    ${asset.display_asset_url ? `<div class="audio-container"><embed src="${asset.display_asset_url}" controls></embed></div>`: ''}
                    ${asset.display_asset_video ? `<div class="video-container"><embed src="${asset.display_asset_video}" controls></embed></div>`: ''}
                    </div>
                    <div class="jic-description-container jic-content-container collapsable fg-b-90">${asset.asset_description}</div>
                    <div class="jic-content-footer"><i class="fa-solid fa-angle-down collapsed desc-expand-ico"></i></div>
                </div>`;
            }
        }
    }
    if (asset.asset_type == "input_asset") {
        switch (asset.asset_content) {
            case "eb" : {
                return `
                <div class="jic-content-sub verticalFlex b-shdw-t1 br-10" id="${asset.asset_id}">
                <div class="jic-content-header bg-b-90">${asset.asset_title}</div>
                <div class="template-eb jic-content-container jic-content-sub-container">
                    <div class="template-eb fullFlex jic-container-introduction">
                        <div class="jic-thread-header-2"><i class="fa-solid fa-angle-up"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Introduction</div>
                        <div class="jic-content-container jic-content-sub-container fg-b-90 collapsable">
                            <textarea class="basic-input-self basic-input br-15 b-shdw-t1" type="text" placeholder="Enter Introduction"></textarea>
                        </div>
                    </div>
                    <div>
                    <div class="jic-thread-container verticalFlex">
                        <div class="jic-thread-header"><i class="fa-solid fa-angle-up"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Thread A</div>
                        <div class="template-eb jic-thread-subContainer">
                            <div class="jic-subThread-container">
                                <div class="template-eb jic-subThread-det-container fullFlex">
                                    <div class="basic-input-container jic-subThread-det-1 b-shdw-t1 br-15"><span>Example 1</span><textarea class="basic-input br-15" type="text" placeholder="Enter Text Here"></textarea></div>

                                </div>
                                
                                <div class="jic-thread-btn-container jic-sub-thread-btn-container"><button class="primary-btn"><i class="fa-regular fa-plus"></i>&nbsp;&nbsp;Example</button></div>
                            </div>
                            <div class="basic-input-container b-shdw-t1 br-15"><span>Argument for Thread A</span><textarea class="basic-input br-15" type="text" placeholder="Enter Text Here"></textarea></div>
                        </div>
                    </div>
                    <div class="jic-thread-btn-container"><button class="primary-btn"><i class="fa-regular fa-plus"></i>&nbsp;&nbsp;New Thread</button></div>
                    </div>
                    <div class="template-eb fullFlex jic-container-conclusion">
                        <div class="jic-thread-header-2"><i class="fa-solid fa-angle-up"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Conclusion</div>
                        <div class="jic-content-container jic-content-sub-container fg-b-90 collapsable">
                            <textarea class="basic-input-self basic-input br-15 b-shdw-t1" type="text" placeholder="Enter Conclusion"></textarea>
                        </div>
                    </div>

                    <div class="jic-thread-btn-container jic-thread-save-btn-container"><button class="ico-btn"><i class="fa-solid fa-floppy-disk"></i></button></div>

                </div>
                <div class="jic-description-container jic-content-container collapsable fg-b-90">${asset.asset_description}</div>
                <div class="jic-content-footer"><i class="fa-solid fa-angle-down collapsed desc-expand-ico"></i></div>
                </div>`;
            }
            case "tb" : {
                return `
                <div class="jic-content-sub verticalFlex b-shdw-t1 br-10">
                <div class="jic-content-header bg-b-90">${asset.asset_title}</div>
                <div class="jic-content-container jic-content-sub-container">
                    <div class="jic-thread-container verticalFlex">
                        <div class="jic-thread-header"><i class="fa-solid fa-angle-up"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Thread A</div>
                        <div class="jic-thread-subContainer">
                            <div class="jic-subThread-container">
                                <div class="jic-subThread-det-container fullFlex">
                                    <div class="basic-input-container jic-subThread-det-1 b-shdw-t1 br-15"><span>Sub Thread 1</span><textarea class="basic-input br-15" type="text" placeholder="Enter Text Here"></textarea></div>
                                    <div class="basic-input-container jic-subThread-det-2 b-shdw-t1 br-15"><span>Sub Interpretion 1</span><textarea class="basic-input br-15" type="text" placeholder="Enter Text Here"></textarea></div>
                                    <div class="jic-subThread-sel-container fullFlex">
                                        <div class="ico-btn-s"><i class="fa-solid fa-lightbulb"></i></div>
                                        <div class="ico-btn-s"><i class="fa-solid fa-message"></i></div>
                                        <select class="dropdown-container-t1 br-5 b-shdw-t1">
                                            <option value="Select Category">Select Category<i class="fa-solid fa-angle-down"></i></option>
                                        </select>
                                        <select class="dropdown-container-t1 br-5 b-shdw-t1">
                                            <option value="Select Category">Select Category<i class="fa-solid fa-angle-down"></i></option>
                                        </select>
                                    </div>

                                </div>
                                
                                <div class="jic-thread-btn-container jic-sub-thread-btn-container"><button class="primary-btn"><i class="fa-regular fa-plus"></i>&nbsp;&nbsp;Sub Thread</button></div>
                            </div>
                            <div class="basic-input-container b-shdw-t1 br-15"><span>Summmary for Thread A</span><textarea class="basic-input br-15" type="text" placeholder="Enter Text Here"></textarea></div>
                            <div class="jic-thread-credit fullFlex">
                                <span>Thread Credit</span>
                                <select class="dropdown-container-t1 br-5 b-shdw-t1">
                                    <option value="Select Category">Select Category<i class="fa-solid fa-angle-down"></i></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="jic-thread-btn-container"><button class="primary-btn"><i class="fa-regular fa-plus"></i>&nbsp;&nbsp;New Thread</button></div>
                    <div class="jic-thread-save-btn-container"><button class="ico-btn"><i class="fa-solid fa-floppy-disk"></i></button></div>
                </div>
                <div class="jic-description-container jic-content-container collapsable fg-b-90">${asset.asset_description}</div>
                <div class="jic-content-footer"><i class="fa-solid fa-angle-down collapsed desc-expand-ico"></i></div>
                </div>`;
            }
            case "article": {
                return `
                <div class="jic-content-sub verticalFlex b-shdw-t1 br-10 display_content-type1" ${asset.asset_id}>
                <div class="jic-content-header jic-content-sub-header bg-b-90">${asset.asset_title}</div>
                <div class="jic-content-container jic-content-sub-container fg-b-90">
                    <textarea class="basic-input-self basic-input br-15 b-shdw-t1" type="text" placeholder="Enter Article"></textarea>
                </div>
                <div class="jic-content-footer"><i class="fa-solid fa-angle-down collapsed desc-expand-ico"></i></div>
                </div>`;
            }
            case "reflection": {
                return `
                <div class="jic-content-sub verticalFlex b-shdw-t1 br-10 display_content-type1" ${asset.asset_id}>
                <div class="jic-content-header jic-content-sub-header bg-b-90">${asset.asset_title}</div>
                <div class="jic-content-container jic-content-sub-container fg-b-90">
                    <textarea class="basic-input-self basic-input br-15 b-shdw-t1" type="text" placeholder="Reflect As Per Given Guidelines"></textarea>
                </div>
                <div class="jic-description-container jic-content-container collapsable fg-b-90">${asset.asset_description}</div>
                <div class="jic-content-footer"><i class="fa-solid fa-angle-down collapsed desc-expand-ico"></i></div>
                </div>`;
            }
        }
    }
}
// import * as load from '@commitlint/load';
// import * as lint from '@commitlint/lint';

// console.log(typeof load);
(() => {


    // const CONFIG = {
    //     extends: ['@commitlint/config-conventional'],
    // };



    // This file is injected as a content script
    console.log("Hello from content script!")

    if (window.location.hostname != "dev.azure.com")
        return;

    const isInPrRoute = window.location.pathname.includes('/pullrequest/');
    if (!isInPrRoute)
        return;

    setInterval(() => {
        const checkboxes = document.getElementsByClassName('bolt-checkbox-label');
        const checkbox = Array.prototype.find.call(checkboxes, function (testElement: Element) {
            return testElement.textContent === 'Customize merge commit message';
        }) as HTMLElement;

        const commentCheckboxParent = checkbox?.parentElement as HTMLElement;

        if (!commentCheckboxParent)
            return;

        if (commentCheckboxParent.classList.contains('checked'))
            return;

        setTimeout(() => {
            commentCheckboxParent.classList.remove('enabled');
            commentCheckboxParent.classList.add('disabled');
        });

        commentCheckboxParent?.getElementsByTagName('span').item(0)?.click()

        // wait for elements to appear due to click
        setTimeout(() => {

            const input = document.querySelector('[aria-label="Title"]') as HTMLInputElement;

            if (!input)
                return;

            const newValue = input.value.replace(/Merged PR .: /gm, "");

            input.value = "";
            console.log(newValue);

        }, 100);

        // setInterval(() => {
        //     const input = document.querySelector('[aria-label="Title"]') as HTMLInputElement;

        //     if (!input)
        //         return;

        //     load.default(CONFIG)
        //         .then((opts: any) =>
        //             lint.default(
        //                 input.value,
        //                 opts.rules,
        //                 opts.parserPreset ? { parserOpts: opts.parserPreset.parserOpts } : {}
        //             )
        //         )
        //         .then((report: any) => console.log(report));



        // }, 100)


    }, 100);
})();


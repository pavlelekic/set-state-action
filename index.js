const setStateActionType = 'SET_STATE_FOR_REDUCER';

export function addSetStateFunctionalityToReducer(reducer) {
    return function (state, action) {
        if (action.type === setStateActionType) {
            return replaceStateAtPath(state, action.newState, action.pathArr);
        }
        else {
            return reducer(state, action);
        }
    };
}

function cloneAlongThePath(pathArr, sourceObj) {
    const newRootNode = { ...sourceObj };
    let newPrevLevelNode = newStateRoot;
    let oldPrevLevelNode = sourceObj;
    let key;

    for (let i = 0; i < pathArr.length; i++) {
        key = pathArr[i];

        newPrevLevelNode[key] = {
            ...oldPrevLevelNode[key]
        };
        newPrevLevelNode = newPrevLevelNode[key];
        oldPrevLevelNode = oldPrevLevelNode[key];
    }

    return newRootNode;
}

function replaceStateAtPath(oldStateRoot, newState, pathArr) {
    const pendingState = cloneAlongThePath(pathArr, oldStateRoot);

    for (key in newState) {
        pendingState[key] = newState[key];
    }

    return pendingState;
}

// reduxSetState: createSetStateActionForReducer('voyageReportsReducer');
export function createSetStateActionForReducer(path) {
    const pathArr = path.split('.');

    return (newState) => ({
        type: setStateActionType,
        pathArr,
        newState
    });
}

/** 
 *
 * Game View: Commenting System behavior
 *
 */

// SOME DECLARATIONS
var commentBasePosition = $('#leave-a-comment')
var commentForm = $('#comment-form-container')
var parentField = $('#parent-id')
var commentSuffix = 'cm-'

// LET'S GO
$(function() {
    // Here's a handler to control single comments actions 
    $('.comment-actions .action').click(function(e) {
        // Retrieve some basic info for current action
        // and comment
        var action = $(this).attr('data-action') // Selected action from "data-" attribute
        var commentId = $(this).closest('.comment').attr('id') // Current comment from closest ".comment" parent id attribute
        console.log('Commenting System action:', action)
        // Decide what to do based on current action
        switch (action) {
            // REPLY:
            case 'reply':
                // Bring the comment form from previous level
                // to current DOM position for the reply
                bringCommentFormIn(commentId);
                break;

            default:
                // Nothing to do if action is not recognized,
                // simply log a message explaining this
                console.log("Commenting system action with no behavior:", action)
        }
    });
    // Handler to abort reply, reset default status
    // (comment form position e parent value)
    $('.close-reply').click(function(e) {
        abortReply()
    });

});

// HELPER FUNCTIONS
// Move Comment Form from "root" level to current comment
// position in DOM given current comment id attribute.
// Useful for comment reply.
var bringCommentFormIn = function(commentId) {
    appendTarget = $('#' + commentId).find('> .comment-body') // Specific part of comment to place reply form in
    commentForm.appendTo(appendTarget) // Append comment form to current comment
    setCommentParent(commentId) // Set form parent field to current comment parent id
}
// Move comment form to default position
// and empty its parent field value
var abortReply = function() {
    commentForm.appendTo(commentBasePosition)
    setCommentParent()
}
// Given current comment id attribute (which contains comment unique slug)
// retrieve parent id and use it as value for form parent field
var setCommentParent = function(commentId) {
    var parentId = commentId ? getCommentParent(commentId) : '' // Retrieve parent id (or set an empty string)...
    parentField.attr('value', parentId); // ...and you use it as form parent field value 
}
// Retrieve parent comment and, if it exists,
// get its id (from id attribute), cut off comment suffix to get 
var getCommentParent = function(commentId) {
    var comment = $('#' + commentId) // Build jQuery selector
    var parentId = comment.closest('.comment').attr('id').replace(commentSuffix, '') // Extract parent id 
    return parentId || '' // Return parent id if existing
}
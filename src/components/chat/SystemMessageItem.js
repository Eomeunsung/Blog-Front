import PropTypes from "prop-types";

function SystemMessageItem({ message }) {
    return (
        <div className="flex justify-center my-3">
            <div className="px-4 py-2 rounded-full bg-neutral-300 text-white text-sm text-center">
                {message.content}
            </div>
        </div>
    );
}

SystemMessageItem.propTypes = {
    message: PropTypes.shape({
        content: PropTypes.string.isRequired,
    }).isRequired,
};

export default SystemMessageItem;
